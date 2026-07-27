import imageCompression from "browser-image-compression";

export async function compressImage(file: File): Promise<{ blob: Blob; dataUrl: string }> {
  const options = {
    maxSizeMB: 2,
    maxWidthOrHeight: 800,
    useWebWorker: true,
    initialQuality: 0.8,
  };

  try {
    const compressed = await imageCompression(file, options);
    const dataUrl = await imageCompression.getDataUrlFromFile(compressed);
    return { blob: compressed, dataUrl };
  } catch {
    throw new Error("Gagal mengompresi foto. Coba gunakan foto lain.");
  }
}
