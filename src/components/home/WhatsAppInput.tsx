"use client";

import { Input } from "@/components/ui/input";
import { sanitizePhone } from "@/lib/parser";
import { Badge } from "@/components/ui/badge";

interface WhatsAppInputProps {
  value?: string;
  onChange: (val: string) => void;
}

export function WhatsAppInput({ value, onChange }: WhatsAppInputProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <label htmlFor="whatsapp" className="text-sm md:text-[15px] font-medium text-white/90">Nomor WhatsApp</label>
        <Badge variant="secondary" className="text-xs bg-white/10 text-white/70 border-white/20">
          Opsional
        </Badge>
      </div>
      <Input
        id="whatsapp"
        type="tel"
        placeholder="62812xxxxxxx"
        value={value || ""}
        onChange={(e) => onChange(sanitizePhone(e.target.value))}
        className="h-[44px] md:h-[48px] rounded-xl text-[15px] px-3.5 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-white/30"
      />
      <p className="text-xs text-white/50">
        Diisi untuk tombol &quot;Hubungi Aku&quot; setelah jawaban Iya
      </p>
    </div>
  );
}
