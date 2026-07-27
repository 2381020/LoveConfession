"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface CopyLinkButtonProps {
  url: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
}

export function CopyLinkButton({ url, variant = "outline", size = "default" }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link berhasil disalin!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Gagal menyalin link");
    }
  };

  return (
    <Button variant={variant} size={size} onClick={handleCopy}>
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      {copied ? "Tersalin!" : "Salin Link"}
    </Button>
  );
}
