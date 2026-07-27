"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-pink-500 via-rose-500 to-purple-600"
    >
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="mb-8"
      >
        <Heart className="w-20 h-20 text-white fill-white" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col items-center gap-4"
      >
        <p className="text-white text-xl font-medium">Menyiapkan sesuatu yang spesial...</p>
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              className="w-2.5 h-2.5 bg-white rounded-full"
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
