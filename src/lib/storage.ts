import { ConfessionData } from "./types";

export async function saveConfession(
  slug: string,
  senderName: string,
  targetName: string,
  message: string,
  theme: string,
  photo?: File,
  music?: File,
  whatsappNumber?: string,
  photoCaption?: string
): Promise<ConfessionData> {
  const formData = new FormData();
  formData.append("slug", slug);
  formData.append("senderName", senderName);
  formData.append("targetName", targetName);
  formData.append("message", message);
  formData.append("theme", theme);
  if (whatsappNumber) formData.append("whatsappNumber", whatsappNumber);
  if (photoCaption) formData.append("photoCaption", photoCaption);
  if (photo) formData.append("photo", photo);
  if (music) formData.append("music", music);

  const res = await fetch("/api/confessions", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Gagal menyimpan confession");
  }

  return res.json();
}

export async function getConfession(slug: string): Promise<ConfessionData | null> {
  const res = await fetch(`/api/confessions/${slug}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Gagal memuat confession");
  return res.json();
}

export function generateSlug(length: number = 8): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let slug = "";
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  for (let i = 0; i < length; i++) {
    slug += chars[array[i] % chars.length];
  }
  return slug;
}
