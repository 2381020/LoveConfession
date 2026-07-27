"use client";

import { motion } from "framer-motion";
import { PolaroidPhoto } from "./PolaroidPhoto";
import { ConfessionData } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

interface LetterStepProps {
  data: ConfessionData;
  onComplete: () => void;
}

export function LetterStep({ data, onComplete }: LetterStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-12"
    >
      <div className="w-full max-w-lg space-y-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="text-white/70 theme-light:text-gray-600 text-lg"
        >
          Dari: <span className="text-white theme-light:text-gray-900 font-semibold">{data.senderName}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/20 shadow-2xl theme-light:bg-white/60 theme-light:border-gray-200"
        >
          <p className="text-white theme-light:text-gray-900 text-lg md:text-xl leading-relaxed whitespace-pre-wrap">
            {data.message}
          </p>
        </motion.div>

        {data.photoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center"
          >
            <PolaroidPhoto src={data.photoUrl} caption={data.photoCaption} />
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center pt-4"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Button
              onClick={onComplete}
              variant="outline"
              size="lg"
              className="bg-white/15 backdrop-blur-sm border-white/30 text-white font-medium text-base px-8 py-6 rounded-full hover:bg-white/25 transition-all shadow-lg theme-light:bg-white/60 theme-light:border-gray-200 theme-light:text-gray-900 theme-light:hover:bg-white/80"
            >
              <ArrowDown className="w-5 h-5" />
              Lanjutkan
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
