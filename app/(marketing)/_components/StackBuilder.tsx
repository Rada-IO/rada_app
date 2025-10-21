export default function StackBuilder() {
  const stacks = [
    { name: "Marketing", tools: ["Copywriter AI", "Scheduler", "Analytics"], cost: "$29–$79/mo" },
    { name: "Content", tools: ["Writer", "Image Gen", "SEO Helper"], cost: "$0–$49/mo" },
    { name: "Automation", tools: ["Workflow", "Email", "CRM"], cost: "$49–$149/mo" },
  ];
  return (
    <section className="py-16">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Example stacks</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {stacks.map((s) => (
            <div key={s.name} className="rounded-2xl border border-black/10 dark:border-white/10 p-6 shadow-sm">
              <h3 className="font-medium">{s.name}</h3>
              <ul className="mt-3 text-sm text-gray-600 dark:text-gray-300 list-disc pl-5">
                {s.tools.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm">Estimated cost: <span className="font-medium">{s.cost}</span></p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


