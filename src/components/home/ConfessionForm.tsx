"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ThemePicker } from "./ThemePicker";
import { PhotoUpload } from "./PhotoUpload";
import { WhatsAppInput } from "./WhatsAppInput";
import { GenerateLinkDialog } from "./GenerateLinkDialog";
import { Theme } from "@/lib/types";
import { themes } from "@/lib/themes";
import { generateSlug, saveConfession } from "@/lib/storage";
import { toast } from "sonner";
import { Sparkles, Music, X } from "lucide-react";

interface ConfessionFormProps {
  theme: Theme;
  onThemeChange: (t: Theme) => void;
}

export function ConfessionForm({ theme, onThemeChange }: ConfessionFormProps) {
  const [targetName, setTargetName] = useState("");
  const [senderName, setSenderName] = useState("");
  const [message, setMessage] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | undefined>();
  const [photoFile, setPhotoFile] = useState<File | undefined>();
  const [photoCaption, setPhotoCaption] = useState("");
  const [musicFile, setMusicFile] = useState<File | undefined>();
  const [musicName, setMusicName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [generatedSlug, setGeneratedSlug] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitHovered, setIsSubmitHovered] = useState(false);
  const musicInputRef = useRef<HTMLInputElement>(null);

  const btnGrad = themes[theme].button;
  const btnGradHover = themes[theme].buttonHover;

  const resetForm = () => {
    setTargetName("");
    setSenderName("");
    setMessage("");
    setPhotoPreview(undefined);
    setPhotoFile(undefined);
    setPhotoCaption("");
    setMusicFile(undefined);
    setMusicName("");
    setWhatsappNumber("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!targetName.trim()) { toast.error("Nama target harus diisi!"); return; }
    if (!senderName.trim()) { toast.error("Nama pengirim harus diisi!"); return; }
    if (!message.trim()) { toast.error("Pesan cinta harus diisi!"); return; }

    setIsSubmitting(true);
    try {
      const slug = generateSlug();
      await saveConfession(
        slug,
        senderName.trim(),
        targetName.trim(),
        message.trim(),
        theme,
        photoFile,
        musicFile,
        whatsappNumber.trim() || undefined,
        photoCaption.trim() || undefined
      );
      setGeneratedSlug(slug);
      setDialogOpen(true);
      toast.success("Confession berhasil dibuat! 🎉");
      resetForm();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal membuat confession");
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <motion.form
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        onSubmit={handleSubmit}
        className="w-[min(100%-32px,560px)] mx-auto space-y-5 md:space-y-6 p-6 md:p-7 rounded-2xl bg-white/15 backdrop-blur-xl border border-white/25 shadow-xl theme-light:bg-white/70 theme-light:border-gray-200"
      >
        <motion.div variants={itemVariants} className="space-y-2">
          <Label htmlFor="targetName" className="text-sm md:text-[15px] font-medium text-white/90 theme-light:text-gray-700">Untuk siapa? 💘</Label>
          <Input id="targetName" placeholder="Nama dia..." value={targetName} maxLength={100}
            onChange={(e) => setTargetName(e.target.value)}
            className="h-[44px] md:h-[48px] rounded-xl text-[15px] px-3.5 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-white/30 theme-light:bg-white/50 theme-light:border-gray-300 theme-light:text-gray-900 theme-light:placeholder:text-gray-400" />
          <p className="text-xs text-white/40 theme-light:text-gray-400 text-right">{targetName.length}/100</p>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-2">
          <Label htmlFor="senderName" className="text-sm md:text-[15px] font-medium text-white/90 theme-light:text-gray-700">Dari siapa? 💌</Label>
          <Input id="senderName" placeholder="Namamu..." value={senderName} maxLength={100}
            onChange={(e) => setSenderName(e.target.value)}
            className="h-[44px] md:h-[48px] rounded-xl text-[15px] px-3.5 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-white/30 theme-light:bg-white/50 theme-light:border-gray-300 theme-light:text-gray-900 theme-light:placeholder:text-gray-400" />
          <p className="text-xs text-white/40 theme-light:text-gray-400 text-right">{senderName.length}/100</p>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-2">
          <Label htmlFor="message" className="text-sm md:text-[15px] font-medium text-white/90 theme-light:text-gray-700">Pesan Cinta 💝</Label>
          <Textarea id="message" placeholder="Tulis pesan cintamu di sini..." value={message}
            maxLength={5000} onChange={(e) => setMessage(e.target.value)}
            rows={5}
            className="min-h-[100px] md:min-h-[120px] rounded-xl text-[15px] px-3.5 py-3 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-white/30 resize-none theme-light:bg-white/50 theme-light:border-gray-300 theme-light:text-gray-900 theme-light:placeholder:text-gray-400" />
          <p className="text-xs text-white/40 theme-light:text-gray-400 text-right">{message.length}/5000</p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <ThemePicker value={theme} onChange={onThemeChange} />
        </motion.div>

        <motion.div variants={itemVariants}>
          <PhotoUpload
            preview={photoPreview}
            file={photoFile}
            caption={photoCaption}
            onChange={(preview, file) => { setPhotoPreview(preview); setPhotoFile(file); }}
            onRemove={() => { setPhotoPreview(undefined); setPhotoFile(undefined); setPhotoCaption(""); }}
            onCaptionChange={setPhotoCaption}
          />
        </motion.div>

        <AnimatePresence>
          {photoPreview && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              variants={itemVariants}
              className="space-y-2 overflow-hidden"
            >
              <Label htmlFor="photoCaption" className="text-sm md:text-[15px] font-medium text-white/90 theme-light:text-gray-700">Caption Foto 💕</Label>
              <Input id="photoCaption" placeholder="Tulis caption untuk foto ini..." value={photoCaption}
                maxLength={200}
                onChange={(e) => setPhotoCaption(e.target.value)}
                className="h-[44px] md:h-[48px] rounded-xl text-[15px] px-3.5 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-white/30 theme-light:bg-white/50 theme-light:border-gray-300 theme-light:text-gray-900 theme-light:placeholder:text-gray-400" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div variants={itemVariants} className="space-y-2">
          <div className="flex items-center gap-2">
            <Label className="text-sm md:text-[15px] font-medium text-white/90 theme-light:text-gray-700">Lagu</Label>
            <Badge variant="secondary" className="text-xs bg-white/10 text-white/70 border-white/20 theme-light:bg-gray-200/50 theme-light:text-gray-600 theme-light:border-gray-300">Opsional</Badge>
          </div>
          <div
            role="button"
            tabIndex={0}
            onClick={() => musicInputRef.current?.click()}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); musicInputRef.current?.click(); } }}
            className="flex items-center gap-3 p-3.5 md:p-4 rounded-xl border-2 border-dashed border-white/30 bg-white/5 hover:bg-white/10 cursor-pointer transition-all theme-light:border-gray-200 theme-light:bg-white/60 theme-light:hover:bg-white/70"
          >
            <Music className="w-5 h-5 text-white/40 theme-light:text-gray-400" />
            <span className="text-sm text-white/70 theme-light:text-gray-600 flex-1 truncate">
              {musicName || "Klik untuk pilih file musik (.mp3, .wav, .ogg, .m4a)"}
            </span>
            {musicName && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setMusicFile(undefined); setMusicName(""); }}
                className="text-white/40 hover:text-white/70 theme-light:text-gray-400 theme-light:hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <p className="text-xs text-white/50 theme-light:text-gray-400">Maksimal 4MB</p>
          <input
            ref={musicInputRef}
            type="file"
            accept="audio/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) {
                if (f.size > 4 * 1024 * 1024) {
                  toast.error("File musik terlalu besar! Maksimal 4MB.");
                  return;
                }
                setMusicFile(f);
                setMusicName(f.name);
              }
            }}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <WhatsAppInput value={whatsappNumber} onChange={setWhatsappNumber} />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Button type="submit" size="lg" disabled={isSubmitting}
            className="w-full h-[52px] md:h-[54px] rounded-xl text-white text-[15px] md:text-base font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50"
            style={{
              background: `linear-gradient(to right, ${isSubmitHovered && !isSubmitting ? btnGradHover.from : btnGrad.from}, ${isSubmitHovered && !isSubmitting ? btnGradHover.via : btnGrad.via}, ${isSubmitHovered && !isSubmitting ? btnGradHover.to : btnGrad.to})`,
              transition: "background 0.2s ease",
            }}
            onMouseEnter={() => setIsSubmitHovered(true)}
            onMouseLeave={() => setIsSubmitHovered(false)}>
            {isSubmitting ? (
              <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Menyimpan…</>
            ) : (
              <><Sparkles className="w-5 h-5" /> Generate Link</>
            )}
          </Button>
        </motion.div>
      </motion.form>

      <GenerateLinkDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        slug={generatedSlug}
        targetName={targetName}
        senderName={senderName}
        theme={theme}
      />
    </>
  );
}
