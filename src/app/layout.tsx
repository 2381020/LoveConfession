import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const poppins = localFont({
  src: [
    { path: "../../public/fonts/poppins-latin-400.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/poppins-latin-500.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/poppins-latin-600.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/poppins-latin-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ec4899",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://confession-link.vercel.app"),
  title: "Confession Link ❤️ — Buat Halaman Nembak Digital",
  description:
    "Buat halaman confession yang manis dan bagikan ke orang spesialmu via link unik. Nembak digital jadi lebih romantis!",
  keywords: ["confession", "nembak", "love letter", "digital", "romantic"],
  openGraph: {
    title: "Confession Link ❤️",
    description: "Buat halaman nembak digital untuk orang spesialmu",
    type: "website",
    locale: "id_ID",
    siteName: "Confession Link",
    images: [
      {
        url: "/og.svg",
        width: 1200,
        height: 630,
        alt: "Confession Link — Buat Halaman Nembak Digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Confession Link ❤️",
    description: "Buat halaman nembak digital untuk orang spesialmu",
    images: ["/og.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={poppins.variable}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={`${poppins.className} antialiased`}>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
