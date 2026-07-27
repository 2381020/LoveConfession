"use client";

import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface Heart {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  emoji: string;
  opacity: number;
}

const HEART_EMOJIS = ["❤️", "💕", "💖", "💗", "💝", "💘"];

export function FloatingHearts() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const count = isMobile ? 7 : 12;
    const generated: Heart[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: isMobile ? 14 + Math.random() * 10 : 16 + Math.random() * 20,
      duration: isMobile ? 10 + Math.random() * 14 : 8 + Math.random() * 12,
      delay: Math.random() * 10,
      emoji: HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)],
      opacity: 0.15 + Math.random() * 0.35,
    }));
    setHearts(generated);
  }, [isMobile]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute bottom-0 animate-[float-up_var(--dur)_var(--del)_linear_infinite]"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            opacity: h.opacity,
            ["--dur" as string]: `${h.duration}s`,
            ["--del" as string]: `${h.delay}s`,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
}
