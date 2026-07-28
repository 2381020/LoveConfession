"use client";

import { useState, useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CopyLinkButton } from "@/components/shared/CopyLinkButton";
import { ShareButtons } from "@/components/shared/ShareButtons";
import { Button } from "@/components/ui/button";
import { ExternalLink, Sparkles } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Theme } from "@/lib/types";
import { themes } from "@/lib/themes";

const QRCodeSVG = lazy(() =>
  import("qrcode.react").then((m) => ({
    default: m.QRCodeSVG,
  }))
);

const fireConfetti = async () => {
  const mod = await import("canvas-confetti");

  mod.default({
    particleCount: 50,
    spread: 60,
    origin: { y: 0.7 },
    colors: ["#f43f5e", "#ec4899", "#d946ef", "#a855f7"],
  });
};

interface GenerateLinkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  slug: string;
  targetName: string;
  senderName: string;
  theme: Theme;
}

export function GenerateLinkDialog({
  open,
  onOpenChange,
  slug,
  targetName,
  senderName,
  theme,
}: GenerateLinkDialogProps) {
  const [phase, setPhase] = useState<"generating" | "done">("generating");
  const [isBtnHovered, setIsBtnHovered] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 640px)");
  const isTablet = useMediaQuery("(min-width: 380px)");
  const qrSize = isDesktop ? 160 : isTablet ? 128 : 112;

  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}/c/${slug}`
      : "";

  const btnGrad = themes[theme].button;
  const btnGradHover = themes[theme].buttonHover;

  useEffect(() => {
    if (!open) return;

    setPhase("generating");

    const timer = setTimeout(() => {
      setPhase("done");
      fireConfetti();
    }, 800);

    return () => clearTimeout(timer);
  }, [open, slug]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          w-[calc(100vw-2rem)]
          max-w-md

          max-h-[90dvh]
          overflow-x-hidden
          overflow-y-auto
          overscroll-contain

          p-0
          gap-0

          bg-white/95
          backdrop-blur-xl
          border-white/20

          rounded-2xl
          shadow-2xl

          /* Close button */
          [&>button]:absolute
          [&>button]:right-3
          [&>button]:top-3
          [&>button]:z-50

          [&>button]:w-8
          [&>button]:h-8
          [&>button]:rounded-full

          [&>button]:bg-white/90
          [&>button]:backdrop-blur-sm

          [&>button]:border
          [&>button]:border-gray-200

          [&>button]:shadow-sm
          [&>button]:opacity-100

          [&>button]:flex
          [&>button]:items-center
          [&>button]:justify-center

          hover:[&>button]:bg-white
          hover:[&>button]:shadow-md
        "
      >
        <AnimatePresence mode="wait">
          {/* ================================
              GENERATING
          ================================= */}
          {phase === "generating" ? (
            <motion.div
              key="generating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="
                w-full
                min-w-0

                min-h-[220px]

                flex
                flex-col
                items-center
                justify-center

                gap-3

                px-5
                py-10
              "
            >
              <div
                className="
                  w-11 h-11
                  sm:w-12 sm:h-12

                  border-[3px]
                  border-pink-200
                  border-t-pink-500

                  rounded-full
                  animate-spin
                "
              />

              <p className="text-sm sm:text-base text-gray-600 font-medium text-center">
                Generating link...
              </p>
            </motion.div>
          ) : (
            /* ================================
                DONE
            ================================= */
            <motion.div
              key="done"
              initial={{
                opacity: 0,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.2,
                ease: "easeOut",
              }}
              className="
                w-full
                min-w-0
                max-w-full

                flex
                flex-col
                items-center

                gap-3
                sm:gap-4

                px-4
                min-[380px]:px-5
                sm:px-6

                pt-12
                sm:pt-12

                pb-5
                sm:pb-6

                overflow-hidden
              "
            >
              {/* ================================
                  SPARKLES
              ================================= */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                  delay: 0.1,
                }}
                className="shrink-0"
              >
                <div
                  className="
                    w-9 h-9
                    sm:w-10 sm:h-10

                    flex
                    items-center
                    justify-center

                    rounded-full
                    bg-pink-50
                  "
                >
                  <Sparkles
                    className="
                      w-5 h-5
                      sm:w-6 sm:h-6
                      text-pink-500
                    "
                  />
                </div>
              </motion.div>

              {/* ================================
                  TITLE
              ================================= */}
              <div className="w-full min-w-0 text-center">
                <h3
                  className="
                    w-full
                    min-w-0

                    px-8

                    text-base
                    min-[380px]:text-lg
                    sm:text-xl

                    leading-tight
                    font-bold
                    text-gray-800

                    break-words
                  "
                >
                  Link Berhasil Dibuat! 🎉
                </h3>

                <p
                  className="
                    w-full
                    min-w-0

                    mt-1
                    px-2

                    text-[11px]
                    min-[380px]:text-xs
                    sm:text-sm

                    leading-relaxed
                    text-gray-500

                    break-words
                  "
                >
                  Kirim link ini ke{" "}
                  <strong className="text-gray-700">
                    {targetName}
                  </strong>{" "}
                  dari{" "}
                  <strong className="text-gray-700">
                    {senderName}
                  </strong>
                </p>
              </div>

              {/* ================================
                  QR CODE
              ================================= */}
              <div
                className="
                  shrink-0

                  bg-white

                  p-2
                  min-[380px]:p-2.5
                  sm:p-3

                  rounded-xl

                  shadow-lg
                  border border-gray-100

                  flex
                  items-center
                  justify-center
                "
              >
                <Suspense
                  fallback={
                    <div
                      className="
                        w-[112px]
                        h-[112px]

                        min-[380px]:w-[128px]
                        min-[380px]:h-[128px]

                        sm:w-[160px]
                        sm:h-[160px]

                        animate-pulse
                        bg-gray-100
                        rounded-lg
                      "
                    />
                  }
                >
                  <QRCodeSVG
                    value={url}
                    size={qrSize}
                    bgColor="#ffffff"
                    fgColor="#000000"
                    level="M"
                    includeMargin={false}
                  />
                </Suspense>
              </div>

              {/* ================================
                  URL
              ================================= */}
              <div
                className="
                  w-full
                  min-w-0
                  max-w-full

                  flex
                  items-center

                  gap-1.5
                  sm:gap-2

                  p-1.5
                  sm:p-2

                  bg-gray-50

                  border
                  border-gray-100

                  rounded-xl
                "
              >
                <code
                  className="
                    block

                    min-w-0
                    flex-1

                    overflow-hidden
                    truncate

                    px-1.5
                    sm:px-2

                    text-[10px]
                    min-[380px]:text-[11px]
                    sm:text-xs

                    text-gray-600
                  "
                  title={url}
                >
                  {url}
                </code>

                <div className="shrink-0">
                  <CopyLinkButton
                    url={url}
                    size="sm"
                  />
                </div>
              </div>

              {/* ================================
                  SHARE BUTTONS
              ================================= */}
              <div
                className="
                  w-full
                  min-w-0
                  max-w-full

                  overflow-hidden
                "
              >
                <ShareButtons
                  url={url}
                  targetName={targetName}
                  senderName={senderName}
                />
              </div>

              {/* ================================
                  CTA
              ================================= */}
              <Button
                onClick={() =>
                  window.open(
                    url,
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
                className="
                  w-full
                  min-w-0

                  h-10
                  sm:h-11

                  px-3
                  sm:px-4

                  gap-2

                  text-xs
                  min-[380px]:text-sm
                  sm:text-base

                  font-medium
                  text-white

                  rounded-xl

                  shadow-sm
                  hover:shadow-md

                  transition-shadow
                "
                style={{
                  background: `linear-gradient(to right, ${
                    isBtnHovered
                      ? btnGradHover.from
                      : btnGrad.from
                  }, ${
                    isBtnHovered
                      ? btnGradHover.to
                      : btnGrad.to
                  })`,
                  transition:
                    "background 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={() =>
                  setIsBtnHovered(true)
                }
                onMouseLeave={() =>
                  setIsBtnHovered(false)
                }
              >
                <ExternalLink
                  className="
                    w-4 h-4
                    shrink-0
                  "
                />

                <span className="truncate">
                  Buka Halaman Confession
                </span>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}