"use client";

import { motion } from "framer-motion";
import { useTypewriter } from "@/hooks/useTypewriter";
import { Button } from "@/components/ui/button";
import { MailOpen } from "lucide-react";

interface TypingStepProps {
  onComplete: () => void;
}

export function TypingStep({ onComplete }: TypingStepProps) {
  const { displayedText, isComplete } = useTypewriter(
    "Seseorang punya sesuatu yang ingin disampaikan...",
    45
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
    >
      <div className="max-w-lg">
        <p className="text-2xl md:text-3xl text-white theme-light:text-gray-900 font-medium leading-relaxed min-h-[120px]">
          {displayedText}
          {!isComplete && (
            <span className="inline-block w-0.5 h-8 bg-white theme-light:bg-gray-900 ml-1 animate-[blink_0.8s_ease-in-out_infinite]" />
          )}
        </p>

        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="mt-10"
          >
            <Button
              onClick={onComplete}
              size="lg"
              className="bg-white text-pink-500 hover:bg-white/90 font-semibold text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              <MailOpen className="w-5 h-5" />
              Buka Surat 💌
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
