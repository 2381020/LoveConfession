import { Theme, ThemeConfig } from "./types";

export const themes: Record<Theme, ThemeConfig> = {
  pink: {
    label: "Pink",
    bg: "linear-gradient(135deg, #fb7185, #ec4899, #d946ef)",
    preview: "linear-gradient(135deg, #fb7185, #ec4899)",
    mode: "dark",
    button: { from: "#ec4899", via: "#f43f5e", to: "#a855f7" },
    buttonHover: { from: "#db2777", via: "#e11d48", to: "#9333ea" },
  },
  sakura: {
    label: "Sakura",
    bg: "linear-gradient(135deg, #fecdd3, #fce7f3, #fff1f2)",
    preview: "linear-gradient(135deg, #fecdd3, #fce7f3)",
    mode: "light",
    button: { from: "#db2777", via: "#e11d48", to: "#9333ea" },
    buttonHover: { from: "#be185d", via: "#be123c", to: "#7e22ce" },
  },
  dark: {
    label: "Dark",
    bg: "linear-gradient(135deg, #1e1b4b, #581c87, #1e1b4b)",
    preview: "linear-gradient(135deg, #1e1b4b, #581c87)",
    mode: "dark",
    button: { from: "#a855f7", via: "#8b5cf6", to: "#d946ef" },
    buttonHover: { from: "#9333ea", via: "#7c3aed", to: "#c026d3" },
  },
  minimal: {
    label: "Minimal",
    bg: "linear-gradient(135deg, #f9fafb, #f3f4f6, #f9fafb)",
    preview: "linear-gradient(135deg, #f9fafb, #e5e7eb)",
    mode: "light",
    button: { from: "#6b7280", via: "#4b5563", to: "#374151" },
    buttonHover: { from: "#4b5563", via: "#374151", to: "#1f2937" },
  },
};
