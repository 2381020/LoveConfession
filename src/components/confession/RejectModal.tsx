"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RejectModalProps {
  open: boolean;
  onClose: () => void;
}

export function RejectModal({ open, onClose }: RejectModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleClose = useCallback(() => {
    onClose();
    try { window.close(); } catch {}
    setTimeout(() => {
      if (!document.hidden) {
        window.location.href = "/";
      }
    }, 300);
  }, [onClose]);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => closeButtonRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, handleClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="reject-modal-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 mb-6"
            >
              <Heart className="w-8 h-8 text-pink-400" />
            </motion.div>

            <h3 id="reject-modal-title" className="text-xl font-bold text-gray-800 mb-3">
              Terima kasih sudah jujur ❤️
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Semoga kita tetap menjadi teman yang baik. Tidak ada yang berubah kok!
            </p>

            <Button
              ref={closeButtonRef}
              onClick={handleClose}
              className="bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white px-8"
            >
              Mengerti 🤗
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
