"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HeartRain } from "@/components/effects/HeartRain";
import { Button } from "@/components/ui/button";
import { Phone, Heart } from "lucide-react";
import confetti from "canvas-confetti";

interface SuccessCelebrationProps {
  senderName: string;
  whatsappNumber?: string;
}

export function SuccessCelebration({ senderName, whatsappNumber }: SuccessCelebrationProps) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ["#f43f5e", "#ec4899", "#d946ef", "#a855f7", "#fbbf24"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ["#f43f5e", "#ec4899", "#d946ef", "#a855f7", "#fbbf24"],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();

    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.6 },
      colors: ["#f43f5e", "#ec4899", "#d946ef", "#a855f7"],
    });

    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-30 flex flex-col items-center justify-center">
      <HeartRain count={35} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-gradient-to-br from-pink-400 via-rose-400 to-purple-500"
        style={{ opacity: 0.9 }}
      />

      {showContent && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="relative z-10 text-center px-4 max-w-lg"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-6xl md:text-8xl mb-6"
          >
            🥹
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            YEAAYYY!! ❤️🥹
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-2">
            Mulai sekarang kita resmi pacaran!
          </p>
          <p className="text-lg text-white/70 mb-8">
            Yeay, {senderName}! 🎉
          </p>

          {whatsappNumber && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <Button
                onClick={() =>
                  window.open(`https://wa.me/${whatsappNumber}`, "_blank", "noopener,noreferrer")
                }
                size="lg"
                className="bg-white text-green-600 hover:bg-white/90 font-semibold text-lg px-8 py-6 rounded-full shadow-xl"
              >
                <Phone className="w-5 h-5" />
                Hubungi Aku 💬
              </Button>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="mt-12 flex justify-center gap-4"
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -20, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                <Heart className="w-8 h-8 text-white fill-white" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
