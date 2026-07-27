"use client";

import { useEffect, useState } from "react";

interface HeartDrop {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  swayDuration: number;
  emoji: string;
}

const HEART_EMOJIS = ["❤️", "💕", "💖", "💗", "💝", "💘", "🩷", "🤍"];

interface HeartRainProps {
  count?: number;
}

export function HeartRain({ count = 30 }: HeartRainProps) {
  const [hearts, setHearts] = useState<HeartDrop[]>([]);

  useEffect(() => {
    const generated: HeartDrop[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 16 + Math.random() * 24,
      duration: 3 + Math.random() * 5,
      delay: Math.random() * 2,
      swayDuration: 1 + Math.random() * 2,
      emoji: HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)],
    }));
    setHearts(generated);
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute top-0 animate-[heart-fall_var(--dur)_var(--del)_linear_forwards]"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            ["--dur" as string]: `${h.duration}s`,
            ["--del" as string]: `${h.delay}s`,
            animation: `heart-fall ${h.duration}s ${h.delay}s linear forwards, heart-sway ${h.swayDuration}s ${h.delay}s ease-in-out infinite alternate`,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
}
