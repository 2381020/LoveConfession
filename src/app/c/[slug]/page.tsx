"use client";

import { useEffect, useState, use, lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import { getConfession } from "@/lib/storage";
import { ConfessionData } from "@/lib/types";
import { themes } from "@/lib/themes";
import { LoadingScreen } from "@/components/confession/LoadingScreen";
import { GreetingStep } from "@/components/confession/GreetingStep";
import { TypingStep } from "@/components/confession/TypingStep";
import { AnimatedBackground } from "@/components/effects/AnimatedBackground";
import { useConfessionFlow } from "@/hooks/useConfessionFlow";
import { Eye } from "lucide-react";
import Link from "next/link";

const LetterStep = lazy(() =>
  import("@/components/confession/LetterStep").then((m) => ({ default: m.LetterStep }))
);
const QuestionStep = lazy(() =>
  import("@/components/confession/QuestionStep").then((m) => ({ default: m.QuestionStep }))
);
const FloatingHearts = lazy(() =>
  import("@/components/effects/FloatingHearts").then((m) => ({ default: m.FloatingHearts }))
);
const BackgroundMusic = lazy(() =>
  import("@/components/confession/BackgroundMusic").then((m) => ({ default: m.BackgroundMusic }))
);

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ConfessionPage({ params }: PageProps) {
  const { slug } = use(params);
  const [data, setData] = useState<ConfessionData | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { step, nextStep } = useConfessionFlow();

  useEffect(() => {
    setMounted(true);
    (async () => {
      try {
        const result = await getConfession(slug);
        if (result) {
          setData(result);
        } else {
          setNotFound(true);
        }
      } catch {
        setNotFound(true);
      }
    })();
  }, [slug]);

  useEffect(() => {
    if (!mounted) return;
    let timer: ReturnType<typeof setTimeout>;
    if (step === "loading") {
      timer = setTimeout(nextStep, 1200);
    } else if (step === "greeting") {
      timer = setTimeout(nextStep, 2000);
    }
    return () => { if (timer) clearTimeout(timer); };
  }, [step, mounted, nextStep]);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-rose-500 to-purple-600">
        <div className="w-12 h-12 border-[3px] border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white text-center px-4">
        <h1 className="text-4xl font-bold mb-4">Surat ini tidak ditemukan 💌</h1>
        <p className="text-white/60 mb-8">Mungkin link-nya salah atau suratnya sudah dihapus.</p>
        <Link
          href="/"
          className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full border border-white/20 transition-all"
        >
          Buat Confession Baru
        </Link>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-rose-500 to-purple-600">
        <div className="w-12 h-12 border-[3px] border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  const themeConfig = themes[data.theme];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground gradient={themeConfig.bg} />
      <Suspense fallback={null}>
        <FloatingHearts />
      </Suspense>

      {data.musicUrl && step !== "loading" && (
        <Suspense fallback={null}>
          <BackgroundMusic url={data.musicUrl} />
        </Suspense>
      )}

      <AnimatePresence mode="wait">
        {step === "loading" && <LoadingScreen key="loading" />}
      </AnimatePresence>

      {step !== "loading" && (
        <>
          <div className="relative z-10">
            <AnimatePresence mode="wait">
              {step === "greeting" && (
                <GreetingStep key="greeting" targetName={data.targetName} />
              )}
              {step === "typing" && (
                <TypingStep key="typing" onComplete={nextStep} />
              )}
              {step === "letter" && (
                <Suspense fallback={null}>
                  <LetterStep key="letter" data={data} onComplete={nextStep} />
                </Suspense>
              )}
              {step === "question" && (
                <Suspense fallback={null}>
                  <QuestionStep key="question" data={data} />
                </Suspense>
              )}
            </AnimatePresence>
          </div>

          {step !== "question" && (
            <div className="fixed bottom-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/20 backdrop-blur-sm text-white/60 text-xs">
              <Eye className="w-3 h-3" />
              Dibuka {data.viewCount} kali
            </div>
          )}
        </>
      )}
    </div>
  );
}
