"use client";
import { useId, useState } from "react";

type LeadCaptureProps = {
  title?: string;
  subtitle?: string;
  successMessage?: string;
};

type FormState = {
  email: string;
  useCase: string;
  budget: string;
  experience: string;
  honey: string;
};

const defaultState: FormState = {
  email: "",
  useCase: "",
  budget: "",
  experience: "",
  honey: "",
};

export default function LeadCapture({
  title = "Get your recommendation",
  subtitle = "Tell us your use case; we’ll email 2–3 best tools with why they fit.",
  successMessage = "Thanks! We’ll send your picks shortly.",
}: LeadCaptureProps) {
  const formId = useId();
  const [state, setState] = useState<FormState>(defaultState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) e.email = "Enter a valid email";
    if (!state.useCase) e.useCase = "Select a use case";
    if (!state.budget) e.budget = "Select a budget";
    if (!state.experience) e.experience = "Select experience";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!validate()) return;
    if (state.honey) return; // honeypot: ignore bots
    try {
      setLoading(true);
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: state.email,
          useCase: state.useCase,
          budget: state.budget,
          experience: state.experience,
          vendor: typeof window !== "undefined" && new URLSearchParams(window.location.search).get("vendor") === "1",
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrors({ form: data?.error ?? "Something went wrong" });
        return;
      }
      setSuccess(true);
      setState(defaultState);
      // Light confetti (CSS only)
      const root = document.getElementById("confetti");
      if (root) {
        root.classList.remove("hidden");
        setTimeout(() => root.classList.add("hidden"), 1200);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="lead" className="py-16">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{title}</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{subtitle}</p>
          </div>
          <form aria-labelledby={`${formId}-title`} onSubmit={onSubmit} noValidate className="rounded-2xl border border-black/10 dark:border-white/10 p-6 shadow-sm bg-white/70 dark:bg-black/30 backdrop-blur">
            <h3 id={`${formId}-title`} className="sr-only">Lead capture form</h3>
            {errors.form && (
              <div className="mb-3 text-sm text-red-600" role="alert">{errors.form}</div>
            )}
            <div className="grid gap-4">
              <div>
                <label htmlFor={`${formId}-email`} className="block text-sm font-medium">Email</label>
                <input
                  id={`${formId}-email`}
                  type="email"
                  autoComplete="email"
                  required
                  value={state.email}
                  onChange={(e) => setState((s) => ({ ...s, email: e.target.value }))}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? `${formId}-email-error` : undefined}
                  className="mt-1 w-full rounded-xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-black/30 px-3 py-2"
                />
                {errors.email && (
                  <p id={`${formId}-email-error`} className="mt-1 text-xs text-red-600">{errors.email}</p>
                )}
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={`${formId}-usecase`} className="block text-sm font-medium">Use-case</label>
                  <select
                    id={`${formId}-usecase`}
                    value={state.useCase}
                    onChange={(e) => setState((s) => ({ ...s, useCase: e.target.value }))}
                    aria-invalid={Boolean(errors.useCase)}
                    aria-describedby={errors.useCase ? `${formId}-usecase-error` : undefined}
                    className="mt-1 w-full rounded-xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-black/30 px-3 py-2"
                    required
                  >
                    <option value="" disabled>Select…</option>
                    {[
                      "Marketing",
                      "Content",
                      "Coding",
                      "Automation",
                      "Design",
                      "Other",
                    ].map((v) => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                  {errors.useCase && (
                    <p id={`${formId}-usecase-error`} className="mt-1 text-xs text-red-600">{errors.useCase}</p>
                  )}
                </div>
                <div>
                  <label htmlFor={`${formId}-budget`} className="block text-sm font-medium">Budget</label>
                  <select
                    id={`${formId}-budget`}
                    value={state.budget}
                    onChange={(e) => setState((s) => ({ ...s, budget: e.target.value }))}
                    aria-invalid={Boolean(errors.budget)}
                    aria-describedby={errors.budget ? `${formId}-budget-error` : undefined}
                    className="mt-1 w-full rounded-xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-black/30 px-3 py-2"
                    required
                  >
                    {[
                      "",
                      "Free",
                      "< $20",
                      "$20–$100",
                      "$100+",
                    ].map((v, i) => (
                      <option key={i} value={v} disabled={i === 0}>{i === 0 ? "Select…" : v}</option>
                    ))}
                  </select>
                  {errors.budget && (
                    <p id={`${formId}-budget-error`} className="mt-1 text-xs text-red-600">{errors.budget}</p>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor={`${formId}-experience`} className="block text-sm font-medium">Experience</label>
                <select
                  id={`${formId}-experience`}
                  value={state.experience}
                  onChange={(e) => setState((s) => ({ ...s, experience: e.target.value }))}
                  aria-invalid={Boolean(errors.experience)}
                  aria-describedby={errors.experience ? `${formId}-experience-error` : undefined}
                  className="mt-1 w-full rounded-xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-black/30 px-3 py-2"
                  required
                >
                  {[
                    "",
                    "Beginner",
                    "Intermediate",
                    "Advanced",
                  ].map((v, i) => (
                    <option key={i} value={v} disabled={i === 0}>{i === 0 ? "Select…" : v}</option>
                  ))}
                </select>
                {errors.experience && (
                  <p id={`${formId}-experience-error`} className="mt-1 text-xs text-red-600">{errors.experience}</p>
                )}
              </div>

              {/* Honeypot */}
              <div className="hidden" aria-hidden>
                <label htmlFor={`${formId}-company`}>Company</label>
                <input id={`${formId}-company`} type="text" value={state.honey} onChange={(e) => setState((s) => ({ ...s, honey: e.target.value }))} />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 inline-flex items-center justify-center rounded-2xl bg-gray-900 text-white dark:bg-white dark:text-black px-5 py-3 text-sm font-medium hover:opacity-90 disabled:opacity-60"
              >
                {loading ? "Submitting…" : "Submit"}
              </button>

              {success && (
                <p className="text-sm text-emerald-600" role="status">{successMessage}</p>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* lightweight confetti */}
      <div id="confetti" className="hidden pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-2 w-2 bg-pink-400 animate-bounce" />
        <div className="absolute left-1/2 top-1/3 h-2 w-2 bg-blue-400 animate-bounce [animation-delay:150ms]" />
        <div className="absolute left-2/3 top-1/2 h-2 w-2 bg-yellow-400 animate-bounce [animation-delay:300ms]" />
      </div>
    </section>
  );
}


