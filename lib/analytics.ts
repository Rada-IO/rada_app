export function trackEvent(name: string, props?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined") return;
  // Plausible event helper (no-op if script not loaded)
  // @ts-expect-error plausible is injected by the script at runtime
  if (window.plausible) {
    // @ts-expect-error plausible is injected by the script at runtime
    window.plausible(name, { props });
  }
}


