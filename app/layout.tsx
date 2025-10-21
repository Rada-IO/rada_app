import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rada.example.com"),
  title: {
    default: "Rada — Personalized AI tool advisor",
    template: "%s — Rada",
  },
  description:
    "Find the right AI tool fast. Rada recommends best-fit tools based on your goals, budget, and workflow.",
  applicationName: "Rada",
  keywords: [
    "AI tools",
    "recommendations",
    "advisor",
    "SaaS",
    "productivity",
  ],
  alternates: { canonical: "/" },
  viewport: { width: "device-width", initialScale: 1 },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  openGraph: {
    title: "Rada — Personalized AI tool advisor",
    description:
      "Rada matches your goals, budget, and workflow to the best AI tools.",
    url: "https://rada.example.com",
    siteName: "Rada",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rada — Personalized AI tool advisor",
    description:
      "Find the right AI tool fast. Personalized matches for better outcomes.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        {/* Skip to content for a11y */}
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 z-50 bg-white text-black dark:bg-black dark:text-white rounded-md px-3 py-2"
        >
          Skip to content
        </a>
        {children}
        {/* Plausible analytics (guarded) */}
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ? (
          <Script
            strategy="afterInteractive"
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.js"
          />
        ) : null}
      </body>
    </html>
  );
}
