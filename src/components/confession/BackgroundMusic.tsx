"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { toast } from "sonner";

interface BackgroundMusicProps {
  url: string;
}

export function BackgroundMusic({ url }: BackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [hintShown, setHintShown] = useState(false);

  useEffect(() => {
    if (!hintShown && url) {
      const timer = setTimeout(() => {
        toast.info("🎵 Ada musik! Klik tombol di kiri bawah untuk memutar.", {
          duration: 5000,
        });
        setHintShown(true);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [url, hintShown]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {
        toast.error("Gagal memutar musik. Coba klik lagi.", { duration: 3000 });
      });
    }
  };

  return (
    <>
      <audio ref={audioRef} src={url} loop preload="metadata" />
      <motion.button
        onClick={toggle}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2 }}
        className="fixed bottom-5 left-5 z-50 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-lg hover:bg-white/30 transition-all"
        title={playing ? "Pause musik" : "Putar musik"}
      >
        {playing ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
      </motion.button>
    </>
  );
}
