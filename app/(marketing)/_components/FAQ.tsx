type QA = { q: string; a: string };

const FAQ_ITEMS: QA[] = [
  {
    q: "What is Rada?",
    a: "Rada is a smart recommendation platform that helps you discover the best AI tools for your specific goals. Instead of wasting hours browsing endless lists, you answer a quick quiz (under 1 minute), and we hand-pick the tools that best fit your use case, budget, and experience level.",
  },
  {
    q: "How does it work?",
    a: "\t1.\tYou take a short quiz (use case, budget, etc.)\n\t2.\tWe process your answers and match them with curated, high-quality AI tools.\n\t3.\tYou’ll receive your personalized recommendations directly — either instantly or by email, depending on your preferences.\n\t4.\tAs the product evolves, recommendations will become smarter and more automated over time.",
  },
  {
    q: "Why should I use Rada instead of just Googling or asking ChatGPT?",
    a: "Google gives lists. ChatGPT gives generic suggestions. Rada gives personalized picks based on your constraints (budget, skill, integrations) and our curation—so you skip the noise and get to the right tools faster.",
  },
  {
    q: "Will I get results instantly?",
    a: "Often yes—if your answers map clearly to high-confidence matches. In some cases we email your picks shortly after the quiz so we can double-check quality. Either way, you’ll receive your recommendations.",
  },
  {
    q: "What kind of tools do you recommend?",
    a: "We focus on practical, trusted tools that help individuals and teams work faster with AI — from marketing and content creation to coding, design, and automation. We avoid spammy or unreliable tools.",
  },
  {
    q: "Is it free?",
    a: "Yes. Rada is free during early access. We may add optional premium features later (e.g., saved stacks or deeper personalization), but core recommendations will remain free.",
  },
  {
    q: "How accurate are the recommendations?",
    a: "We’re constantly improving our matching system. In this early stage, we rely on human curation combined with lightweight matching logic. As we grow, recommendations will become increasingly automated and tailored.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-16">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">FAQ</h2>
        <div className="mt-6 rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden divide-y divide-black/10 dark:divide-white/10">
          {FAQ_ITEMS.map((item) => (
            <details key={item.q} className="group">
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none select-none py-4 px-4 sm:px-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-none">
                <span className="font-medium text-gray-900 dark:text-gray-100">{item.q}</span>
                <span className="shrink-0 transition-transform duration-300 group-open:rotate-180" aria-hidden>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </summary>
              <div className="px-4 sm:px-6 pb-4 text-sm leading-6 text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}


