export default function FeatureComparison() {
  const rows = [
    { feature: "Personalization", basic: "—", rada: "✓" },
    { feature: "Decision support", basic: "—", rada: "✓" },
    { feature: "Onboarding guidance", basic: "—", rada: "✓" },
    { feature: "Churn insights", basic: "—", rada: "✓" },
    { feature: "Stack recommendations", basic: "—", rada: "✓" },
  ];
  return (
    <section className="py-16">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-x-auto rounded-2xl border border-black/10 dark:border-white/10">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-black/5 dark:bg-white/5">
              <tr>
                <th className="py-3 px-4">Feature</th>
                <th className="py-3 px-4">Generic lists</th>
                <th className="py-3 px-4">Rada</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.feature} className="border-t border-black/10 dark:border-white/10">
                  <th className="py-3 px-4 font-medium">{r.feature}</th>
                  <td className="py-3 px-4 text-center">{r.basic}</td>
                  <td className="py-3 px-4 text-center">{r.rada}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}


