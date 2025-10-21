import { Compass, ListChecks, Table, Workflow } from "lucide-react";

const items = [
  { icon: <Compass aria-hidden />, title: "Guided onboarding", desc: "Answer a few questions about your goals and context." },
  { icon: <ListChecks aria-hidden />, title: "Curated recommendations", desc: "Ranked by price, fit, reviews, and integrations." },
  { icon: <Table aria-hidden />, title: "Feature comparison", desc: "Side‑by‑side tables with transparent pricing." },
  { icon: <Workflow aria-hidden />, title: "Stack builder", desc: "Recommend full workflows that work together." },
];

export default function FeaturesOverview() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <div key={it.title} className="rounded-2xl border border-black/10 dark:border-white/10 p-6 shadow-sm">
              <div className="h-10 w-10 rounded-xl btn-gradient grid place-items-center text-white" aria-hidden>{it.icon}</div>
              <h3 className="mt-4 font-medium text-lg">{it.title}</h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


