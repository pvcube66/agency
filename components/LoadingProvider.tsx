"use client";

import { useState } from "react";
import { LoadingScreen } from "@/components/LoadingScreen";

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Small delay before showing content for smooth transition
    setTimeout(() => setShowContent(true), 100);
  };

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <div
        style={{
          opacity: showContent ? 1 : 0,
          transition: "opacity 0.5s ease-out",
        }}
      >
        {children}
      </div>
    </>
  );
}
