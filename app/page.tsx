import Header from "./(marketing)/_components/Header";
import Hero from "./(marketing)/_components/Hero";
import HowItWorks from "./(marketing)/_components/HowItWorks";
import FAQ from "./(marketing)/_components/FAQ";
import Footer from "./(marketing)/_components/Footer";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "ToolPilot",
        url: "https://rada.example.com",
        sameAs: [
          "https://twitter.com/",
          "https://www.linkedin.com/",
        ],
      },
      {
        "@type": "Product",
        name: "Rada",
        description: "Personalized AI tool advisor",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD", category: "Free to start" },
      },
    ],
  } as const;

  return (
    <>
      <Header />
      <main id="content">
        <Hero />
        <HowItWorks />
        <FAQ />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
