"use client";

import { motion } from "framer-motion";
import { useRejectButton } from "@/hooks/useRejectButton";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface AnswerButtonsProps {
  onYes: () => void;
  onNo: () => void;
}

export function AnswerButtons({ onYes, onNo }: AnswerButtonsProps) {
  const {
    currentText,
    position,
    iyaScale,
    isExhausted,
    containerRef,
    handleNoHover,
  } = useRejectButton();

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[60vh] flex flex-col items-center justify-center gap-10"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-3xl md:text-5xl font-bold text-white text-center"
      >
        Maukah kamu jadi pacarku?
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: iyaScale }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <Button
          onClick={onYes}
          size="lg"
          className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-lg px-12 py-8 rounded-full shadow-xl hover:shadow-2xl transition-all"
        >
          <Heart className="w-5 h-5 fill-white" />
          Iya ❤️
        </Button>
      </motion.div>

      <motion.div
        className="absolute z-20"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          left: position.x,
          top: position.y,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Button
          variant="outline"
          size="lg"
          onMouseEnter={handleNoHover}
          onTouchStart={handleNoHover}
          onClick={() => {
            if (isExhausted) onNo();
          }}
          className={`
            bg-white/10 border-white/30 text-white font-medium px-8 py-7 rounded-full backdrop-blur-sm
            hover:bg-white/20 transition-all whitespace-nowrap cursor-pointer
            ${isExhausted ? "border-red-300/50 animate-pulse" : ""}
          `}
        >
          {currentText}
        </Button>
      </motion.div>
    </div>
  );
}
