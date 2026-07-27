import { Theme, ThemeConfig } from "./types";

export const themes: Record<Theme, ThemeConfig> = {
  pink: {
    label: "Pink",
    bg: "linear-gradient(135deg, #fb7185, #ec4899, #d946ef)",
    preview: "linear-gradient(135deg, #fb7185, #ec4899)",
  },
  sakura: {
    label: "Sakura",
    bg: "linear-gradient(135deg, #fecdd3, #fce7f3, #fff1f2)",
    preview: "linear-gradient(135deg, #fecdd3, #fce7f3)",
  },
  dark: {
    label: "Dark",
    bg: "linear-gradient(135deg, #1e1b4b, #581c87, #1e1b4b)",
    preview: "linear-gradient(135deg, #1e1b4b, #581c87)",
  },
  minimal: {
    label: "Minimal",
    bg: "linear-gradient(135deg, #f9fafb, #f3f4f6, #f9fafb)",
    preview: "linear-gradient(135deg, #f9fafb, #e5e7eb)",
  },
};
