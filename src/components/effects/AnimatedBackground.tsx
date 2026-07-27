"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";

interface AnimatedBackgroundProps {
  gradient: string;
}

export function AnimatedBackground({ gradient }: AnimatedBackgroundProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" style={{ background: gradient }}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div
        className="absolute rounded-full opacity-30"
        style={{
          width: isMobile ? 300 : 500,
          height: isMobile ? 300 : 500,
          background: "radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)",
          top: "10%",
          left: "20%",
          filter: `blur(${isMobile ? 35 : 60}px)`,
          willChange: "transform",
          animation: "drift 20s ease-in-out infinite",
        }}
      />
      <div
        className="absolute rounded-full opacity-20"
        style={{
          width: isMobile ? 250 : 400,
          height: isMobile ? 250 : 400,
          background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
          bottom: "20%",
          right: "10%",
          filter: `blur(${isMobile ? 30 : 80}px)`,
          willChange: "transform",
          animation: "drift 25s ease-in-out infinite reverse",
        }}
      />
      {!isMobile && (
        <div
          className="absolute w-[300px] h-[300px] rounded-full opacity-25"
          style={{
            background: "radial-gradient(circle, rgba(255,200,220,0.3) 0%, transparent 70%)",
            top: "50%",
            left: "60%",
            filter: "blur(70px)",
            willChange: "transform",
            animation: "drift 15s ease-in-out infinite",
          }}
        />
      )}
    </div>
  );
}
