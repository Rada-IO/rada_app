"use client";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";

export default function PostHogInit() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Initialize only once
    // @ts-expect-error - private flag to avoid double init in fast refresh
    if (!window.__PH_INITIALIZED__) {
      posthog.init("phc_N624DTPyp5Ugye6laWib2QZYIKXtkEE7bvvow52alMU", {
        api_host: "https://us.i.posthog.com",
        capture_pageview: false,
        opt_in_site_apps: true, // Enable surveys and other site apps
      });
      // @ts-expect-error - adding custom flag to window
      window.__PH_INITIALIZED__ = true;
    }
  }, []);

  useEffect(() => {
    // Track client-side navigations
    if (typeof window === "undefined") return;
    posthog.capture("$pageview", { path: `${pathname}${searchParams?.toString() ? `?${searchParams.toString()}` : ""}` });
  }, [pathname, searchParams]);

  return null;
}




