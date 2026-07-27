import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase-server";

export const maxDuration = 60;

const CLEANUP_SECRET = process.env.CLEANUP_SECRET;

async function deleteStorageFiles(slug: string) {
  const { data: files } = await supabase.storage
    .from("confessions")
    .list(slug);

  if (files && files.length > 0) {
    const paths = files.map((f) => `${slug}/${f.name}`);
    await supabase.storage.from("confessions").remove(paths);
  }
}

export async function GET(request: NextRequest) {
  try {
    const isCron = request.headers.get("x-vercel-cron") === "1";
    const isAuthorized =
      isCron ||
      (CLEANUP_SECRET &&
        request.nextUrl.searchParams.get("secret") === CLEANUP_SECRET);

    if (!isAuthorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const cutoff = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

    const { data: oldData } = await supabase
      .from("confessions")
      .select("slug, photo_url, music_url")
      .lt("created_at", cutoff);

    if (!oldData || oldData.length === 0) {
      return NextResponse.json({ success: true, deleted: 0 });
    }

    for (const row of oldData) {
      await deleteStorageFiles(row.slug);
    }

    const { error } = await supabase
      .from("confessions")
      .delete()
      .lt("created_at", cutoff);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      deleted: oldData.length,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
