"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export function HeroSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center py-8 md:py-14"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-sm md:text-base text-white/90 mb-4 md:mb-6"
      >
        <Heart className="w-4 h-4 fill-current" />
        <span>Confession Link</span>
        <Heart className="w-4 h-4 fill-current" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-[2.5rem] md:text-[3.5rem] lg:text-[3.75rem] font-bold text-white leading-[1.15] mb-4 md:mb-6"
      >
        Buat Halaman
        <br />
        <span className="bg-gradient-to-r from-yellow-200 via-pink-200 to-white bg-clip-text text-transparent">
          Nembak Digital ❤️
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="text-base md:text-lg text-white/80 max-w-2xl mx-auto"
      >
        Buat halaman confession yang manis dan bagikan ke orang spesialmu via link unik
      </motion.p>
    </motion.div>
  );
}
