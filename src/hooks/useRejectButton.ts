"use client";

import { useState, useCallback, useRef, useEffect } from "react";

const REJECT_TEXTS = [
  "Tidak",
  "Yakin?",
  "Bener nih?",
  "Kasihan aku 🥺",
  "Pikir lagi dong 🥹",
  "Serius?",
  "😭",
];

export function useRejectButton() {
  const [runCount, setRunCount] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isExhausted, setIsExhausted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const vw = typeof window !== "undefined" ? window.innerWidth : 800;
    const vh = typeof window !== "undefined" ? window.innerHeight : 600;

    setPosition({
      x: Math.min(vw * 0.55, vw - 180),
      y: Math.max(100, vh * 0.4),
    });
  }, []);

  const currentText = REJECT_TEXTS[Math.min(runCount, REJECT_TEXTS.length - 1)];
  const iyaScale = 1 + runCount * 0.12;

  const handleNoHover = useCallback(() => {
    if (isExhausted) return;

    const newCount = runCount + 1;

    if (newCount >= REJECT_TEXTS.length) {
      setIsExhausted(true);
      return;
    }

    setRunCount(newCount);

    const vw = typeof window !== "undefined" ? window.innerWidth : 800;
    const vh = typeof window !== "undefined" ? window.innerHeight : 600;

    const btnWidth = 160;
    const btnHeight = 56;
    const padding = 20;

    const maxX = Math.max(padding, vw - btnWidth - padding);
    const maxY = Math.max(padding + 100, vh - btnHeight - padding - 100);

    setPosition({
      x: padding + Math.random() * (maxX - padding),
      y: 100 + Math.random() * (maxY - 100),
    });
  }, [runCount, isExhausted]);

  return {
    currentText,
    position,
    iyaScale,
    isExhausted,
    runCount,
    containerRef,
    handleNoHover,
  };
}
