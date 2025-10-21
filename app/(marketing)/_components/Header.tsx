"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

type NavItem = { href: string; label: string };

export type HeaderProps = {
  logoLabel?: string;
  navItems?: NavItem[];
  cta?: { href: string; label: string };
};

export default function Header({
  logoLabel = "Rada",
  navItems = [
    { href: "#how", label: "How it works" },
    { href: "#faq", label: "FAQ" },
    { href: "/blog", label: "Blog" },
  ],
  cta,
}: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [elevated, setElevated] = useState(false);

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/30 ${
        elevated ? "border-b border-black/10 dark:border-white/10" : ""
      }`}
      role="banner"
    >
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3" aria-label="Rada home">
            <img src="/logo.svg" alt="" className="h-7 w-7 sm:h-8 sm:w-8" />
            <span className="align-middle text-base font-semibold tracking-tight">{logoLabel}</span>
          </Link>

          <nav className="hidden md:flex items-center gap-2" aria-label="Primary">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm md:text-base font-medium text-gray-800 dark:text-gray-200 px-3 py-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            className="md:hidden p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden /> : <Menu aria-hidden />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-black/10 dark:border-white/10" role="dialog" aria-modal="true">
          <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-base font-medium text-gray-800 dark:text-gray-100 px-2 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}


