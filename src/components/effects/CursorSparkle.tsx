"use client";

import { useEffect, useRef } from "react";

interface Sparkle {
  x: number;
  y: number;
  id: number;
  size: number;
  rotation: number;
  color: string;
}

const COLORS = ["#f43f5e", "#ec4899", "#d946ef", "#a855f7", "#fbbf24", "#fb923c"];

export function CursorSparkle() {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<HTMLElement[]>([]);
  const idRef = useRef(0);
  const lastTimeRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTimeRef.current < 50) return;
      lastTimeRef.current = now;

      for (let i = 0; i < 2; i++) {
        const sparkle: Sparkle = {
          x: e.clientX + (Math.random() - 0.5) * 20,
          y: e.clientY + (Math.random() - 0.5) * 20,
          id: idRef.current++,
          size: 4 + Math.random() * 8,
          rotation: Math.random() * 360,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        };
        const el = createSparkleElement(container, sparkle);
        elementsRef.current.push(el);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      elementsRef.current.forEach((el) => el.remove());
      elementsRef.current = [];
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-50" />;
}

function createSparkleElement(container: HTMLDivElement, sparkle: Sparkle): HTMLElement {
  const el = document.createElement("div");
  el.innerHTML = "✦";
  el.style.cssText = `
    position: fixed;
    left: ${sparkle.x}px;
    top: ${sparkle.y}px;
    font-size: ${sparkle.size}px;
    color: ${sparkle.color};
    pointer-events: none;
    transform: rotate(${sparkle.rotation}deg) scale(0);
    animation: sparkle-anim 0.6s ease-out forwards;
    z-index: 50;
  `;
  container.appendChild(el);
  setTimeout(() => {
    el.remove();
  }, 600);
  return el;
}
