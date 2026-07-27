"use client";

import { motion } from "framer-motion";

interface GreetingStepProps {
  targetName: string;
}

export function GreetingStep({ targetName }: GreetingStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
    >
      <motion.h1
        className="text-4xl md:text-6xl font-bold text-white mb-4"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        Hai, {targetName} ❤️
      </motion.h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="text-lg text-white/70"
      >
        Ada sesuatu untukmu...
      </motion.div>
    </motion.div>
  );
}
