"use client";
import Link from "next/link";

export type HeroProps = {
  title?: string;
  subtitle?: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
};

export default function Hero({
  title = "Find the right AI tool — in under a minute.",
  subtitle = "Your personal guide to the right AI tools.",
  primaryCta = { href: "#lead", label: "Start your recommendation" },
  secondaryCta = { href: "#how", label: "See how it works" },
}: HeroProps) {
  return (
    <section className="bg-hero-gradient">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center">
        <h1 className="mx-auto max-w-5xl text-4xl sm:text-6xl font-semibold tracking-tight text-gradient">A personalized AI tool recommendation</h1>
        <p className="mx-auto max-w-2xl mt-6 text-lg text-gray-700 dark:text-gray-300">Stop searching. Start building — with the right tools.</p>
        <div className="mx-auto mt-8 max-w-xl">
          <Link href="/get-recommendation" className="btn-gradient block rounded-2xl px-5 py-3 text-sm font-medium text-white text-center">Take the quiz now</Link>
        </div>
        {/* removed secondary link per feedback */}
      </div>
    </section>
  );
}


