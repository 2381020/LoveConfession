export type Theme = "pink" | "sakura" | "dark" | "minimal";

export interface ConfessionData {
  id?: string;
  slug: string;
  senderName: string;
  targetName: string;
  message: string;
  theme: Theme;
  photoUrl?: string;
  photoCaption?: string;
  musicUrl?: string;
  whatsappNumber?: string;
  viewCount: number;
  createdAt: string;
}

export interface ThemeConfig {
  bg: string;
  label: string;
  preview: string;
  mode: "light" | "dark";
  button: { from: string; via: string; to: string };
  buttonHover: { from: string; via: string; to: string };
}
