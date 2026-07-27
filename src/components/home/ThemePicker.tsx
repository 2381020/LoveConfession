"use client";

import { motion } from "framer-motion";
import { Theme } from "@/lib/types";
import { themes } from "@/lib/themes";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ThemePickerProps {
  value: Theme;
  onChange: (t: Theme) => void;
}

const themeOptions: Theme[] = ["pink", "sakura", "dark", "minimal"];

export function ThemePicker({ value, onChange }: ThemePickerProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm md:text-[15px] font-medium text-white/90 theme-light:text-gray-700">Pilih Tema</label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {themeOptions.map((t) => {
          const config = themes[t];
          const isSelected = value === t;
          return (
            <motion.button
              key={t}
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onChange(t)}
              className={cn(
                "relative flex flex-col items-center gap-2 p-3.5 md:p-4 rounded-xl border-2 transition-all cursor-pointer",
                isSelected
                  ? "border-white bg-white/20 shadow-lg theme-light:border-gray-400 theme-light:bg-white/70"
                  : "border-white/20 bg-white/5 hover:bg-white/10 theme-light:border-gray-200 theme-light:bg-white/60 theme-light:hover:bg-white/70"
              )}
            >
              <div
                className="w-full h-14 md:h-16 rounded-xl"
                style={{ background: config.preview }}
              />
              <span className="text-xs md:text-sm font-medium text-white/90 theme-light:text-gray-700">{config.label}</span>
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-white flex items-center justify-center"
                >
                  <Check className="w-3.5 h-3.5 text-pink-500" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
