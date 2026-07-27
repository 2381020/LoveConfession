"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export function HeroSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center py-12 md:py-20"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-sm text-white/90 mb-6"
      >
        <Heart className="w-4 h-4 fill-current" />
        <span>Confession Link</span>
        <Heart className="w-4 h-4 fill-current" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
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
        className="text-lg md:text-xl text-white/80 max-w-lg mx-auto"
      >
        Buat halaman confession yang manis dan bagikan ke orang spesialmu via link unik
      </motion.p>
    </motion.div>
  );
}
