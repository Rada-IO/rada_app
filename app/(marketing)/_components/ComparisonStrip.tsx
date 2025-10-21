import { Check, X } from "lucide-react";

export default function ComparisonStrip() {
  const features = [
    "Personalization",
    "Decision support",
    "Onboarding guidance",
    "Churn insights",
    "Stack recommendations",
  ];
  const rows = features.map((name) => ({ name }));
  const yes = (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white" aria-label="Yes">
      <Check size={16} aria-hidden />
    </span>
  );
  const no = (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white" aria-label="No">
      <X size={16} aria-hidden />
    </span>
  );

  return (
    <section className="py-16">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm border-separate border-spacing-y-2" aria-label="Comparison table">
            <thead>
              <tr>
                <th className="py-2 pr-4" />
                <th className="py-2 px-4 font-semibold">Rada</th>
                <th className="py-2 px-4 font-semibold">Google/ChatGPT</th>
                <th className="py-2 px-4 font-semibold">Listicles</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.name} className="align-middle">
                  <th scope="row" className="py-3 pr-4 text-gray-700 dark:text-gray-200">{r.name}</th>
                  <td className="py-3 px-4">{yes}</td>
                  <td className="py-3 px-4">{r.name === "Onboarding guidance" || r.name === "Churn insights" || r.name === "Stack recommendations" ? no : no}</td>
                  <td className="py-3 px-4">{no}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}


