import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase-server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!slug || slug.length > 50) {
      return NextResponse.json({ error: "Slug tidak valid" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("confessions")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Confession tidak ditemukan" }, { status: 404 });
    }

    const { error: updateError } = await supabase.rpc("increment_view_count", {
      slug_param: slug,
    });

    const newCount = updateError ? data.view_count : data.view_count + 1;

    return NextResponse.json({
      id: data.id,
      slug: data.slug,
      senderName: data.sender_name,
      targetName: data.target_name,
      message: data.message,
      theme: data.theme,
      photoUrl: data.photo_url,
      musicUrl: data.music_url,
      whatsappNumber: data.whatsapp,
      viewCount: newCount,
      createdAt: data.created_at,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
