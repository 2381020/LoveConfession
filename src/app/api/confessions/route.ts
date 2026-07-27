import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase-server";

const MAX_PHOTO_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_MUSIC_SIZE = 4 * 1024 * 1024; // 4MB (Vercel serverless limit)
const ALLOWED_PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const ALLOWED_MUSIC_TYPES = ["audio/mpeg", "audio/mp3", "audio/wav", "audio/ogg", "audio/x-m4a", "audio/mp4"];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const slug = formData.get("slug") as string;
    const senderName = formData.get("senderName") as string;
    const targetName = formData.get("targetName") as string;
    const message = formData.get("message") as string;
    const theme = formData.get("theme") as string;
    const whatsappNumber = (formData.get("whatsappNumber") as string) || null;
    const photo = formData.get("photo") as File | null;
    const music = formData.get("music") as File | null;

    if (!slug || !senderName || !targetName || !message || !theme) {
      return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
    }

    if (senderName.length > 100 || targetName.length > 100) {
      return NextResponse.json({ error: "Nama terlalu panjang (maks 100 karakter)" }, { status: 400 });
    }

    if (message.length > 5000) {
      return NextResponse.json({ error: "Pesan terlalu panjang (maks 5000 karakter)" }, { status: 400 });
    }

    if (!["pink", "sakura", "dark", "minimal"].includes(theme)) {
      return NextResponse.json({ error: "Theme tidak valid" }, { status: 400 });
    }

    let photoUrl: string | null = null;
    let musicUrl: string | null = null;

    if (photo && photo.size > 0) {
      if (!ALLOWED_PHOTO_TYPES.includes(photo.type)) {
        return NextResponse.json({ error: "Format foto tidak didukung (jpg, png, webp, gif)" }, { status: 400 });
      }
      if (photo.size > MAX_PHOTO_SIZE) {
        return NextResponse.json({ error: "Foto terlalu besar (maks 5MB)" }, { status: 400 });
      }
      const ext = photo.name.split(".").pop() || "jpg";
      const path = `${slug}/photo.${ext}`;
      const { error } = await supabase.storage
        .from("confessions")
        .upload(path, photo, { contentType: photo.type, upsert: true });
      if (error) throw new Error(`Gagal upload foto: ${error.message}`);
      const { data } = supabase.storage.from("confessions").getPublicUrl(path);
      photoUrl = data.publicUrl;
    }

    if (music && music.size > 0) {
      if (!ALLOWED_MUSIC_TYPES.includes(music.type)) {
        return NextResponse.json({ error: "Format musik tidak didukung (mp3, wav, ogg, m4a)" }, { status: 400 });
      }
      if (music.size > MAX_MUSIC_SIZE) {
        return NextResponse.json({ error: "Musik terlalu besar (maks 4MB)" }, { status: 400 });
      }
      const ext = music.name.split(".").pop() || "mp3";
      const path = `${slug}/music.${ext}`;
      const { error } = await supabase.storage
        .from("confessions")
        .upload(path, music, { contentType: music.type, upsert: true });
      if (error) throw new Error(`Gagal upload musik: ${error.message}`);
      const { data } = supabase.storage.from("confessions").getPublicUrl(path);
      musicUrl = data.publicUrl;
    }

    const { error: dbError } = await supabase.from("confessions").insert({
      slug,
      sender_name: senderName,
      target_name: targetName,
      message,
      theme,
      photo_url: photoUrl,
      music_url: musicUrl,
      whatsapp: whatsappNumber,
      view_count: 0,
    });

    if (dbError) throw new Error(`Gagal simpan data: ${dbError.message}`);

    return NextResponse.json({
      slug,
      senderName,
      targetName,
      message,
      theme,
      photoUrl,
      musicUrl,
      whatsappNumber,
      viewCount: 0,
      createdAt: new Date().toISOString(),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
