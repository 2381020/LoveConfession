"use client";

import { useState, lazy, Suspense } from "react";
import { AnswerButtons } from "./AnswerButtons";
import { RejectModal } from "./RejectModal";
import { ConfessionData } from "@/lib/types";

const SuccessCelebration = lazy(() =>
  import("./SuccessCelebration").then((m) => ({ default: m.SuccessCelebration }))
);

interface QuestionStepProps {
  data: ConfessionData;
}

export function QuestionStep({ data }: QuestionStepProps) {
  const [answer, setAnswer] = useState<"yes" | "no" | null>(null);
  const [showRejectModal, setShowRejectModal] = useState(false);

  const handleYes = () => {
    setAnswer("yes");
  };

  const handleNo = () => {
    setShowRejectModal(true);
  };

  if (answer === "yes") {
    return (
      <Suspense fallback={null}>
        <SuccessCelebration
          senderName={data.senderName}
          whatsappNumber={data.whatsappNumber}
        />
      </Suspense>
    );
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <AnswerButtons onYes={handleYes} onNo={handleNo} />
      <RejectModal
        open={showRejectModal}
        onClose={() => setShowRejectModal(false)}
      />
    </div>
  );
}
