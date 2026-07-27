"use client";

export default function ConfessionError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Gagal memuat confession 😥</h1>
      <p className="text-white/60 mb-8 max-w-md">
        {error.message || "Terjadi kesalahan saat memuat confession. Coba lagi."}
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full border border-white/20 transition-all"
        >
          Coba Lagi
        </button>
      </div>
    </div>
  );
}
