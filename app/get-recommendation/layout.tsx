"use client";
import React, { useState, useEffect } from "react";

export default function GetRecommendationLayout({ children }: { children: React.ReactNode }) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Check if desktop on mount
    const checkDesktop = () => {
      setIsDesktop(window.matchMedia("(min-width: 1024px)").matches);
    };

    checkDesktop();

    // Listen for resize
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Prevent hydration mismatch by always rendering the same content on first render
  if (!mounted) {
    return <>{children}</>;
  }

  // After hydration, apply desktop layout if needed
  if (!isDesktop) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/30 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-auto rounded-2xl">
        {children}
      </div>
    </div>
  );
}
