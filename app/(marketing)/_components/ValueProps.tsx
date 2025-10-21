import { CheckCircle2, Layers, ListTree, Users } from "lucide-react";

type Item = { title: string; description: string; icon: React.ReactNode };

export type ValuePropsProps = { items?: Item[] };

export default function ValueProps({ items }: ValuePropsProps) {
  const list: Item[] =
    items ?? [
      { title: "Personalized matches", description: "Based on your goals & constraints.", icon: <CheckCircle2 aria-hidden /> },
      { title: "Transparent comparisons", description: "See trade-offs clearly.", icon: <ListTree aria-hidden /> },
      { title: "Stack suggestions", description: "What works well together.", icon: <Layers aria-hidden /> },
      { title: "Lower churn for vendors", description: "Better-fit users stick.", icon: <Users aria-hidden /> },
    ];

  return (
    <section className="py-16">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((it, i) => (
            <div key={i} className="rounded-2xl border border-black/10 dark:border-white/10 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-10 w-10 rounded-xl bg-black text-white dark:bg-white dark:text-black grid place-items-center" aria-hidden>
                {it.icon}
              </div>
              <h3 className="mt-4 font-medium">{it.title}</h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{it.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


