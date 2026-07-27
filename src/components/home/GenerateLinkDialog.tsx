"use client";

import { useState, useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CopyLinkButton } from "@/components/shared/CopyLinkButton";
import { ShareButtons } from "@/components/shared/ShareButtons";
import { Button } from "@/components/ui/button";
import { ExternalLink, Sparkles } from "lucide-react";

const QRCodeSVG = lazy(() =>
  import("qrcode.react").then((m) => ({ default: m.QRCodeSVG }))
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
}

export function GenerateLinkDialog({
  open,
  onOpenChange,
  slug,
  targetName,
  senderName,
}: GenerateLinkDialogProps) {
  const [phase, setPhase] = useState<"generating" | "done">("generating");
  const url = typeof window !== "undefined" ? `${window.location.origin}/c/${slug}` : "";

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
      <DialogContent className="bg-white/95 backdrop-blur-xl border-white/20 max-w-md">
        <AnimatePresence mode="wait">
          {phase === "generating" ? (
            <motion.div
              key="generating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4 py-8"
            >
              <div className="w-12 h-12 border-[3px] border-pink-200 border-t-pink-500 rounded-full animate-spin" />
              <p className="text-gray-600 font-medium">Generating link...</p>
            </motion.div>
          ) : (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-5 py-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
              >
                <Sparkles className="w-8 h-8 text-pink-500" />
              </motion.div>

              <h3 className="text-xl font-bold text-gray-800">Link Berhasil Dibuat! 🎉</h3>
              <p className="text-sm text-gray-500 text-center">
                Kirim link ini ke <strong>{targetName}</strong> dari <strong>{senderName}</strong>
              </p>

              <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
                <Suspense fallback={<div className="w-[180px] h-[180px] animate-pulse bg-gray-100 rounded-lg" />}>
                  <QRCodeSVG
                    value={url}
                    size={180}
                    bgColor="#ffffff"
                    fgColor="#ec4899"
                    level="M"
                    includeMargin={false}
                  />
                </Suspense>
              </div>

              <div className="w-full flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                <code className="flex-1 text-xs text-gray-600 truncate px-2">{url}</code>
                <CopyLinkButton url={url} size="sm" />
              </div>

              <ShareButtons url={url} targetName={targetName} senderName={senderName} />

              <Button
                onClick={() => window.open(url, "_blank", "noopener,noreferrer")}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
              >
                <ExternalLink className="w-4 h-4" />
                Buka Halaman Confession
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
