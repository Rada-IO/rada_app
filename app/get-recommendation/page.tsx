"use client";
import { useEffect, useMemo, useReducer } from "react";
import Link from "next/link";
import { quizSchema, type QuizPayload } from "@/lib/validation";
import { trackEvent as track } from "@/lib/analytics";

type Step = 1 | 2 | 3 | 4 | 5 | 6;

type State = { step: Step; data: Partial<QuizPayload>; errors: Record<string, string>; submitting: boolean; ok: boolean };
type Action =
  | { type: "set"; key: keyof QuizPayload; value: unknown }
  | { type: "next" }
  | { type: "back" }
  | { type: "errors"; errors: Record<string, string> }
  | { type: "submitting"; submitting: boolean }
  | { type: "ok" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "set":
      return { ...state, data: { ...state.data, [action.key]: action.value } };
    case "next":
      return { ...state, step: (Math.min(6, (state.step + 1)) as Step) };
    case "back":
      return { ...state, step: (Math.max(1, (state.step - 1)) as Step) };
    case "errors":
      return { ...state, errors: action.errors };
    case "submitting":
      return { ...state, submitting: action.submitting };
    case "ok":
      return { ...state, ok: true };
  }
}

export default function GetRecommendationPage() {
  const [state, dispatch] = useReducer(reducer, { step: 1, data: { integrations: [] }, errors: {}, submitting: false, ok: false });
  const { step, data, errors, submitting, ok } = state;
  const total = 6;

  useEffect(() => {
    // hydrate from sessionStorage
    try {
      const saved = sessionStorage.getItem("rada-quiz");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object") Object.entries(parsed).forEach(([k, v]) => dispatch({ type: "set", key: k as keyof QuizPayload, value: v }));
      }
    } catch {}
    track("quiz_start");
  }, []);

  useEffect(() => {
    try { sessionStorage.setItem("rada-quiz", JSON.stringify(data)); } catch {}
  }, [data]);

  const progress = useMemo(() => `${step} of ${total}`, [step]);

  const onNext = () => {
    const currentValidation = (() => {
      if (step === 1) return quizSchema.pick({ useCase: true });
      if (step === 2) return quizSchema.pick({ budget: true });
      if (step === 3) return quizSchema.pick({ experience: true });
      if (step === 4) return quizSchema.pick({ integrations: true });
      if (step === 5) return quizSchema.pick({ email: true });
      return quizSchema.pick({ problem: true }).partial();
    })();
    const res = currentValidation.safeParse(data);
    if (!res.success) {
      const e: Record<string, string> = {};
      for (const issue of res.error.issues) e[issue.path[0] as string] = issue.message;
      dispatch({ type: "errors", errors: e });
      return;
    }
    dispatch({ type: "errors", errors: {} });
    dispatch({ type: "next" });
    track("quiz_step_completed", { step });
  };

  const onBack = () => dispatch({ type: "back" });

  const onSubmit = async () => {
    const res = quizSchema.safeParse(data);
    if (!res.success) {
      const e: Record<string, string> = {};
      for (const issue of res.error.issues) e[issue.path[0] as string] = issue.message;
      dispatch({ type: "errors", errors: e });
      return;
    }
    try {
      dispatch({ type: "submitting", submitting: true });
      const url = new URL(typeof window !== "undefined" ? window.location.href : "http://localhost");
      const utm = {
        source: url.searchParams.get("utm_source") || undefined,
        medium: url.searchParams.get("utm_medium") || undefined,
        campaign: url.searchParams.get("utm_campaign") || undefined,
      };
      const payload: QuizPayload = { ...res.data, utm };
      const resp = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!resp.ok) throw new Error("Failed");
      track("lead_submitted", { useCase: payload.useCase, budget: payload.budget, experience: payload.experience });
      dispatch({ type: "ok" });
      track("lead_success");
    } finally {
      dispatch({ type: "submitting", submitting: false });
    }
  };

  if (ok) return <Success />;

  return (
    <main className="min-h-[80vh] mx-auto max-w-md px-4 py-10">
      <div className="rounded-2xl bg-white/90 dark:bg-neutral-900/90 shadow-sm ring-1 ring-black/5 p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Get your recommendation</h1>
        <div className="mt-1 flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
          <p>Step {progress}</p>
        </div>
        <div className="mt-2 h-1.5 bg-neutral-200/70 rounded-full"><div className="h-1.5 bg-neutral-900 rounded-full" style={{ width: `${(step/total)*100}%` }} /></div>

        <div className="mt-6 space-y-6">
          {step === 1 && (
            <fieldset>
              <legend className="text-xl font-semibold">What are you trying to do?</legend>
              <div className="mt-3 grid gap-2">
                {["marketing","content","coding","automation","design","other"].map((v)=> (
                  <label key={v} className="inline-flex items-center gap-2 rounded-xl border px-4 py-3 data-[checked=true]:bg-neutral-900 data-[checked=true]:text-white" data-checked={data.useCase===v}>
                    <input type="radio" name="useCase" value={v} className="sr-only" onChange={(ev)=> dispatch({ type: "set", key: "useCase", value: ev.target.value })} />
                    <span className="capitalize">{v}</span>
                  </label>
                ))}
              </div>
              {errors.useCase && <p className="mt-2 text-sm text-red-600">{errors.useCase}</p>}
            </fieldset>
          )}

          {step === 2 && (
            <fieldset>
              <legend className="text-xl font-semibold">What’s your budget?</legend>
              <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">(We’ll only recommend tools that actually fit.)</p>
              <div className="mt-3 grid gap-2">
                {["free","<20","20-100",">100"].map((v)=> (
                  <label key={v} className="inline-flex items-center gap-2 rounded-xl border px-4 py-3 data-[checked=true]:bg-neutral-900 data-[checked=true]:text-white" data-checked={data.budget===v}>
                    <input type="radio" name="budget" value={v} className="sr-only" onChange={(ev)=> dispatch({ type: "set", key: "budget", value: ev.target.value })} />
                    <span>{v==="<20"?"< $20": v==="20-100"?"$20–$100": v===">100"?"$100+":"Free"}</span>
                  </label>
                ))}
              </div>
              {errors.budget && <p className="mt-2 text-sm text-red-600">{errors.budget}</p>}
            </fieldset>
          )}

          {step === 3 && (
            <fieldset>
              <legend className="text-xl font-semibold">What’s your experience level?</legend>
              <div className="mt-3 grid gap-2">
                {["beginner","intermediate","advanced"].map((v)=> (
                  <label key={v} className="inline-flex items-center gap-2 rounded-xl border px-4 py-3 data-[checked=true]:bg-neutral-900 data-[checked=true]:text-white" data-checked={data.experience===v}>
                    <input type="radio" name="experience" value={v} className="sr-only" onChange={(ev)=> dispatch({ type: "set", key: "experience", value: ev.target.value })} />
                    <span className="capitalize">{v}</span>
                  </label>
                ))}
              </div>
              {errors.experience && <p className="mt-2 text-sm text-red-600">{errors.experience}</p>}
            </fieldset>
          )}

          {step === 4 && (
            <fieldset>
              <legend className="text-xl font-semibold">Any required integrations? <span className="text-sm font-normal text-gray-500">(optional)</span></legend>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {["Notion","Zapier","Slack","Google Drive"].map((v)=> {
                  const checked = (data.integrations||[]).includes(v);
                  return (
                    <label key={v} className="inline-flex items-center gap-2 rounded-xl border px-4 py-3 data-[checked=true]:bg-neutral-900 data-[checked=true]:text-white" data-checked={checked}>
                      <input type="checkbox" className="sr-only" checked={checked} onChange={()=> {
                        const next = checked ? (data.integrations||[]).filter((x)=> x!==v) : [...(data.integrations||[]), v];
                        dispatch({ type: "set", key: "integrations", value: next });
                      }} />
                      <span>{v}</span>
                    </label>
                  );
                })}
              </div>
              <button type="button" className="mt-3 text-sm underline" onClick={()=> dispatch({ type: "set", key: "integrations", value: [] })}>Skip this step</button>
            </fieldset>
          )}

          {step === 5 && (
            <fieldset>
              <legend className="text-xl font-semibold">Where should we send your picks?</legend>
              <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">(We’ll only email your recommendations. No spam.)</p>
              <input
                type="email"
                className="mt-3 w-full rounded-xl border px-4 py-3"
                placeholder="you@example.com"
                aria-invalid={Boolean(errors.email)}
                onChange={(e)=> dispatch({ type: "set", key: "email", value: e.target.value })}
              />
              {/* Honeypot */}
              <div className="hidden" aria-hidden>
                <label htmlFor="company">Company</label>
                <input id="company" type="text" onChange={(ev)=> dispatch({ type: "set", key: "honey" as keyof QuizPayload, value: (ev.target as HTMLInputElement).value })} />
              </div>
              {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
            </fieldset>
          )}

          {step === 6 && (
            <fieldset>
              <legend className="text-xl font-semibold">What problem are you trying to solve? <span className="text-sm font-normal text-gray-500">(optional)</span></legend>
              <textarea className="mt-3 w-full rounded-xl border px-4 py-3" rows={3} placeholder="Optional — a sentence helps us tailor your picks." onChange={(e)=> dispatch({ type: "set", key: "problem", value: e.target.value })} />
            </fieldset>
          )}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3">
          <button type="button" onClick={onBack} className="rounded-2xl border px-4 py-3 font-medium hover:bg-neutral-50" disabled={step===1}>Back</button>
          {step < 6 ? (
            <button type="button" onClick={onNext} className="w-full rounded-2xl bg-neutral-900 text-white py-3.5 font-medium hover:bg-neutral-800 disabled:opacity-50" disabled={submitting}>Continue</button>
          ) : (
            <button type="button" onClick={onSubmit} className="w-full rounded-2xl bg-neutral-900 text-white py-3.5 font-medium hover:bg-neutral-800 disabled:opacity-50" disabled={submitting}>Submit</button>
          )}
        </div>
      </div>
    </main>
  );
}

function Success() {
  return (
    <main className="min-h-[80vh] mx-auto max-w-md px-4 py-10">
      <div className="rounded-2xl bg-white/90 dark:bg-neutral-900/90 shadow-sm ring-1 ring-black/5 p-6 md:p-8 text-center">
        <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-emerald-100 text-emerald-700 grid place-items-center">✅</div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Thanks! We’re preparing your picks.</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">You’ll receive 2–3 recommendations tailored to your answers.</p>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <Link href="/" className="rounded-2xl border px-4 py-3 font-medium hover:bg-neutral-50">Back to home</Link>
          <Link href="/get-recommendation" className="rounded-2xl bg-neutral-900 text-white px-4 py-3.5 font-medium hover:bg-neutral-800">Retake quiz</Link>
        </div>
      </div>
    </main>
  );
}


