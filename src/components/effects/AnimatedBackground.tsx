"use client";

interface AnimatedBackgroundProps {
  gradient: string;
}

export function AnimatedBackground({ gradient }: AnimatedBackgroundProps) {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" style={{ background: gradient }}>
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-30 animate-[drift_20s_ease-in-out_infinite]"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)",
          top: "10%",
          left: "20%",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-20 animate-[drift_25s_ease-in-out_infinite_reverse]"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
          bottom: "20%",
          right: "10%",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute w-[300px] h-[300px] rounded-full opacity-25 animate-[drift_15s_ease-in-out_infinite]"
        style={{
          background: "radial-gradient(circle, rgba(255,200,220,0.3) 0%, transparent 70%)",
          top: "50%",
          left: "60%",
          filter: "blur(70px)",
        }}
      />
    </div>
  );
}
