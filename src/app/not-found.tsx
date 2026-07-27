import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white text-center px-4">
      <h1 className="text-4xl font-bold mb-4">404 — Halaman Tidak Ditemukan</h1>
      <p className="text-white/60 mb-8">Halaman yang kamu cari tidak ada atau sudah dipindahkan.</p>
      <Link
        href="/"
        className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 rounded-full transition-all"
      >
        Ke Beranda
      </Link>
    </div>
  );
}
