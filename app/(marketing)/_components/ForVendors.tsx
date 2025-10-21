import Link from "next/link";

export default function ForVendors() {
  return (
    <section id="vendors" className="py-14 bg-black/5 dark:bg-white/5">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold">Better-fit users. Lower churn.</h2>
            <ul className="mt-3 grid gap-2 text-sm text-gray-700 dark:text-gray-300 sm:grid-cols-3">
              <li>Pre-qualified leads</li>
              <li>Onboarding guidance reduces early drop-off</li>
              <li>Aggregated churn insights</li>
            </ul>
          </div>
          <Link
            href="/api/lead?vendor=1"
            className="self-start md:self-auto rounded-2xl px-5 py-3 bg-gray-900 text-white dark:bg-white dark:text-black text-sm font-medium hover:opacity-90"
          >
            Join vendor beta
          </Link>
        </div>
      </div>
    </section>
  );
}


