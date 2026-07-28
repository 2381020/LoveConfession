"use client";

import { MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

interface ShareButtonsProps {
  url: string;
  targetName: string;
  senderName: string;
}

export function ShareButtons({ url, targetName, senderName }: ShareButtonsProps) {
  const text = `${senderName} punya sesuatu untukmu, ${targetName} 💌`;
  const encodedText = encodeURIComponent(text);
  const encodedUrl = encodeURIComponent(url);

  return (
    <div className="flex flex-row flex-wrap sm:flex-nowrap gap-2 justify-center">
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          window.open(`https://wa.me/?text=${encodedText}%20${encodedUrl}`, "_blank", "noopener,noreferrer")
        }
        className="gap-1 justify-center max-sm:h-7 max-sm:px-2"
      >
        <MessageCircle className="w-4 h-4" />
        <span className="hidden sm:inline">WhatsApp</span>
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          window.open(
            `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
            "_blank",
            "noopener noreferrer"
          )
        }
        className="gap-1 justify-center max-sm:h-7 max-sm:px-2"
      >
        <Send className="w-4 h-4" />
        <span className="hidden sm:inline">Telegram</span>
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          window.open(
            `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
            "_blank",
            "noopener noreferrer"
          )
        }
        className="gap-1 justify-center max-sm:h-7 max-sm:px-2"
      >
        <XIcon className="w-4 h-4" />
        <span className="hidden sm:inline">Twitter</span>
      </Button>
    </div>
  );
}
