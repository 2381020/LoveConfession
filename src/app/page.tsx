"use client";

import { useState, lazy, Suspense } from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { ConfessionForm } from "@/components/home/ConfessionForm";
import { AnimatedBackground } from "@/components/effects/AnimatedBackground";
import { Theme } from "@/lib/types";
import { themes } from "@/lib/themes";

const FloatingHearts = lazy(() =>
  import("@/components/effects/FloatingHearts").then((m) => ({ default: m.FloatingHearts }))
);
const CursorSparkle = lazy(() =>
  import("@/components/effects/CursorSparkle").then((m) => ({ default: m.CursorSparkle }))
);

export default function Home() {
  const [theme, setTheme] = useState<Theme>("pink");

  return (
    <div className="min-h-screen relative" data-theme-mode={themes[theme].mode}>
      <AnimatedBackground gradient={themes[theme].bg} />
      <Suspense fallback={null}>
        <FloatingHearts />
        <CursorSparkle />
      </Suspense>

      <main className="relative z-10 px-4 pb-16 md:pb-24">
        <HeroSection />
        <ConfessionForm theme={theme} onThemeChange={setTheme} />
      </main>
    </div>
  );
}
