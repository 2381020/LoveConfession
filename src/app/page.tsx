"use client";

import { lazy, Suspense } from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { ConfessionForm } from "@/components/home/ConfessionForm";
import { AnimatedBackground } from "@/components/effects/AnimatedBackground";

const FloatingHearts = lazy(() =>
  import("@/components/effects/FloatingHearts").then((m) => ({ default: m.FloatingHearts }))
);
const CursorSparkle = lazy(() =>
  import("@/components/effects/CursorSparkle").then((m) => ({ default: m.CursorSparkle }))
);

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <AnimatedBackground gradient="linear-gradient(135deg, #fb7185, #ec4899, #d946ef)" />
      <Suspense fallback={null}>
        <FloatingHearts />
        <CursorSparkle />
      </Suspense>

      <main className="relative z-10 px-4 pb-20">
        <HeroSection />
        <ConfessionForm />
      </main>
    </div>
  );
}
