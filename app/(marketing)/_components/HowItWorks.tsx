import { ListChecks, Binary, Sparkles } from "lucide-react";

type Step = { title: string; description: string; icon: React.ReactNode };

export type HowItWorksProps = { steps?: Step[] };

export default function HowItWorks({ steps }: HowItWorksProps) {
  const items: Step[] =
    steps ?? [
      { title: "Tell us your goal", description: "Quick 45s quiz.", icon: <ListChecks aria-hidden /> },
      { title: "We score tools for your context.", description: "Constraints + scoring.", icon: <Binary aria-hidden /> },
      { title: "Get a short list & onboarding tips.", description: "Clear, actionable picks.", icon: <Sparkles aria-hidden /> },
    ];

  return (
    <section id="how" className="py-16">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-center">How it works</h2>
        <p className="mt-2 text-center text-gray-700 dark:text-gray-300 text-base">From confusion to clarity in minutes</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.concat({ title: "Build your stack", description: "Tools that play nicely together.", icon: <Sparkles aria-hidden /> }).map((s, i) => (
            <div key={i} className="rounded-2xl border border-black/10 dark:border-white/10 p-6 shadow-sm">
              <div className="text-5xl font-semibold text-[color:var(--brand-start)]/60" aria-hidden>{String(i + 1).padStart(2, '0')}</div>
              <h3 className="mt-4 font-medium text-lg">{s.title}</h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{s.description}</p>
            </div>
          ))}
        </div>
        {/* timing note removed per request */}
      </div>
    </section>
  );
}


