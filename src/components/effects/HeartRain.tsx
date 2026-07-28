"use client";

import { useMemo } from "react";

const HEART_EMOJIS = ["❤️", "💕", "💖", "💗", "💝", "💘", "🩷", "🤍"];

interface HeartRainProps {
  count?: number;
}

export function HeartRain({ count = 30 }: HeartRainProps) {
  const hearts = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: ((i * 17.3 + 3.7) % 100),
      size: 16 + ((i * 7 + 13) % 24),
      duration: 3 + ((i * 3 + 5) % 5),
      delay: (i * 0.3) % 2,
      swayDuration: 1 + ((i * 5 + 2) % 2),
      emoji: HEART_EMOJIS[i % HEART_EMOJIS.length],
    }));
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute top-0"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            animation: `heart-fall ${h.duration}s ${h.delay}s linear forwards, heart-sway ${h.swayDuration}s ${h.delay}s ease-in-out infinite alternate`,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
}
