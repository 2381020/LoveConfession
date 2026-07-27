"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageIcon, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface PhotoUploadProps {
  preview?: string;
  file?: File;
  caption?: string;
  onChange: (preview: string, file: File) => void;
  onRemove: () => void;
  onCaptionChange?: (caption: string) => void;
}

export function PhotoUpload({ preview, file, caption, onChange, onRemove, onCaptionChange }: PhotoUploadProps) {
  const [isCompressing, setIsCompressing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (selectedFile: File) => {
    if (!selectedFile.type.startsWith("image/")) {
      toast.error("File harus berupa gambar!");
      return;
    }
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error("File terlalu besar! Maksimal 5MB sebelum kompresi.");
      return;
    }

    setIsCompressing(true);
    try {
      const { compressImage } = await import("@/lib/compress");
      const { blob, dataUrl } = await compressImage(selectedFile);
      const compressedFile = new File([blob], selectedFile.name, { type: blob.type });
      onChange(dataUrl, compressedFile);
      toast.success("Foto berhasil diupload!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal mengompresi foto");
    } finally {
      setIsCompressing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) handleFile(droppedFile);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <label className="text-sm md:text-[15px] font-medium text-white/90 theme-light:text-gray-700">Foto</label>
        <Badge variant="secondary" className="text-xs bg-white/10 text-white/70 border-white/20 theme-light:bg-gray-200/50 theme-light:text-gray-600 theme-light:border-gray-300">Opsional</Badge>
      </div>
      <AnimatePresence mode="wait">
        {preview ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative w-full max-w-xs mx-auto"
          >
            <div className="bg-white p-2 pb-8 rounded-lg shadow-lg rotate-2 hover:rotate-0 transition-transform">
              <img src={preview} alt="Preview" className="w-full h-52 md:h-56 object-cover rounded" loading="lazy" />
              {caption && <p className="text-center text-xs text-gray-500 mt-2">{caption}</p>}
            </div>
            <button
              type="button"
              onClick={onRemove}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              role="button"
              tabIndex={0}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); inputRef.current?.click(); } }}
              className={`flex flex-col items-center gap-3 p-5 md:p-6 rounded-xl border-2 border-dashed cursor-pointer transition-all min-h-[90px] md:min-h-[100px] ${isDragging ? "border-white bg-white/20 theme-light:border-gray-400 theme-light:bg-white/70" : "border-white/30 bg-white/5 hover:bg-white/10 theme-light:border-gray-200 theme-light:bg-white/60 theme-light:hover:bg-white/70"}`}
            >
              {isCompressing ? (
                <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin theme-light:border-gray-300 theme-light:border-t-gray-600" />
              ) : (
                <ImageIcon className="w-10 h-10 text-white/60 theme-light:text-gray-400" />
              )}
              <p className="text-sm text-white/70 theme-light:text-gray-600">
                {isCompressing ? "Mengompresi foto..." : "Drag & drop foto atau klik untuk upload"}
              </p>
              <p className="text-xs text-white/50 theme-light:text-gray-400">Maksimal 2MB (setelah kompresi)</p>
            </div>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFile(f);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
