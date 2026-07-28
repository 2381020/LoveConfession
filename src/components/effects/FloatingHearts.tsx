"use client";

import { useMemo } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface Heart {
  id: number;
  left: number;
  emoji: string;
}

const HEART_EMOJIS = ["❤️", "💕", "💖", "💗", "💝", "💘"];

function seededHeart(id: number): Heart {
  return {
    id,
    left: ((id * 13.37 + 7.1) % 100),
    emoji: HEART_EMOJIS[id % HEART_EMOJIS.length],
  };
}

export function FloatingHearts() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const hearts = useMemo(() => {
    const count = 12;
    return Array.from({ length: count }, (_, i) => seededHeart(i));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((h, i) => {
        const size = isMobile ? 14 + ((i * 3 + 5) % 10) : 16 + ((i * 7 + 3) % 20);
        const dur = isMobile ? 10 + ((i * 5 + 2) % 14) : 8 + ((i * 3 + 7) % 12);
        const del = (i * 1.1) % 10;
        const opacity = 0.15 + ((i * 9 + 1) % 5) * 0.07;
        return (
          <span
            key={h.id}
            className="absolute bottom-0 animate-[float-up_var(--dur)_var(--del)_linear_infinite]"
            style={{
              left: `${h.left}%`,
              fontSize: `${size}px`,
              opacity,
              ["--dur" as string]: `${dur}s`,
              ["--del" as string]: `${del}s`,
            }}
          >
            {h.emoji}
          </span>
        );
      })}
    </div>
  );
}
