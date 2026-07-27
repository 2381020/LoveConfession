"use client";

import { useState, useCallback } from "react";

export type ConfessionStep = "loading" | "greeting" | "typing" | "letter" | "question";

export function useConfessionFlow() {
  const [step, setStep] = useState<ConfessionStep>("loading");

  const nextStep = useCallback(() => {
    setStep((current) => {
      switch (current) {
        case "loading":
          return "greeting";
        case "greeting":
          return "typing";
        case "typing":
          return "letter";
        case "letter":
          return "question";
        default:
          return current;
      }
    });
  }, []);

  return { step, nextStep };
}
