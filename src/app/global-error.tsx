"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="id">
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white text-center px-4">
          <h1 className="text-4xl font-bold mb-4">Ups, ada yang salah 😥</h1>
          <p className="text-white/60 mb-8 max-w-md">
            Terjadi kesalahan yang tidak terduga. Coba lagi atau kembali ke beranda.
          </p>
          <div className="flex gap-3">
            <button
              onClick={reset}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full border border-white/20 transition-all"
            >
              Coba Lagi
            </button>
            <Link
              href="/"
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 rounded-full transition-all"
            >
              Ke Beranda
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
