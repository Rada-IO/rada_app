"use client";
import React from "react";
export default function GetRecommendationLayout({ children }: { children: React.ReactNode }) {
  const isDesktop = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(min-width: 1024px)").matches;
  if (!isDesktop) return <>{children}</>;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/30 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-auto rounded-2xl">
        {children}
      </div>
    </div>
  );
}


