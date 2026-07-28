"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { HeartRain } from "@/components/effects/HeartRain";
import { Button } from "@/components/ui/button";
import { Heart, Share2, Phone } from "lucide-react";
import confetti from "canvas-confetti";
import { normalizePhone } from "@/lib/parser";

interface SuccessCelebrationProps {
  senderName: string;
  whatsappNumber?: string;
}

export function SuccessCelebration({ senderName, whatsappNumber }: SuccessCelebrationProps) {
  const [showContent, setShowContent] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const duration = 2500;
    const end = Date.now() + duration;
    let rafId: number;

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
      if (Date.now() < end) rafId = requestAnimationFrame(frame);
    };
    rafId = requestAnimationFrame(frame);

    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.6 },
      colors: ["#f43f5e", "#ec4899", "#d946ef", "#a855f7"],
    });

    const timer = setTimeout(() => setShowContent(true), 500);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const handleShare = useCallback(async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Confession Link ❤️",
          text: `Hey! Ada confession spesial untukmu nih! 💕`,
          url,
        });
      } catch {}
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {}
    }
  }, []);

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center min-h-[100svh]">
      <HeartRain count={35} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-gradient-to-br from-pink-400 via-rose-400 to-purple-500"
        style={{ opacity: 0.9 }}
      />

      {showContent && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 text-center px-4 w-[calc(100%-32px)] max-w-[640px]"
        >
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [0, 3, -3, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="text-5xl md:text-7xl mb-5"
          >
            
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[2.75rem] md:text-[4rem] lg:text-[4.75rem] font-bold text-white theme-light:text-gray-900 leading-[1.1] mb-4 md:mb-5"
          >
            YEAYYYY!! 💖
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-xl md:text-2xl lg:text-[1.75rem] font-medium text-white theme-light:text-gray-900 mb-2 leading-snug"
          >
            Mulai sekarang kita resmi pacaran!
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-lg md:text-xl text-white/85 theme-light:text-gray-800 mb-8 md:mb-10"
          >
            Love You, {senderName}! 🎉💕
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex justify-center items-center gap-3 md:gap-4 mb-8 md:mb-10"
          >
            {[
              { size: "text-2xl md:text-3xl", y: [-4, -14, -4], dur: 2.8 },
              { size: "text-xl md:text-2xl", y: [0, -10, 0], dur: 3.2 },
              { size: "text-2xl md:text-3xl", y: [-2, -12, -2], dur: 2.5 },
              { size: "text-xl md:text-2xl", y: [0, -8, 0], dur: 3.5 },
              { size: "text-2xl md:text-3xl", y: [-3, -14, -3], dur: 2.9 },
            ].map((h, i) => (
              <motion.div
                key={i}
                animate={{ y: h.y }}
                transition={{
                  duration: h.dur,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.15,
                }}
                className={`${h.size} opacity-80`}
              >
                <Heart className="w-6 h-6 md:w-7 md:h-7 text-white fill-white theme-light:text-gray-900 theme-light:fill-gray-900" />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="flex flex-col items-center gap-3"
          >
            <Button
              onClick={handleShare}
              size="lg"
              className="w-[280px] md:w-[320px] h-[52px] md:h-[54px] rounded-2xl bg-white text-pink-600 hover:bg-white/95 font-bold text-[15px] md:text-base shadow-xl hover:shadow-2xl hover:-translate-y-1 hover:glow transition-all duration-200 active:scale-[0.97]"
            >
              <Share2 className="w-5 h-5 mr-1" />
              {copied ? "Link Disalin! ✅" : "Bagikan Momen Ini "}
            </Button>

            {whatsappNumber && (
              <Button
                onClick={() =>
                  window.open(
                    `https://wa.me/${normalizePhone(whatsappNumber)}?text=${encodeURIComponent("Halo! Aku terima confession-nya 💕")}`,
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
                size="lg"
                className="w-[280px] md:w-[320px] h-[52px] md:h-[54px] rounded-2xl bg-green-500 hover:bg-green-600 text-white font-bold text-[15px] md:text-base shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 active:scale-[0.97]"
              >
                <Phone className="w-5 h-5 mr-1 fill-white" />
                Hubungi Aku 
              </Button>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
