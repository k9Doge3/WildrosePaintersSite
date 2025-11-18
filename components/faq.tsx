const faqs = [
  {
    question: "How fast can you start once I approve the quote?",
    answer:
      "Interior projects usually start within 5-7 days. Exterior work depends on weather but we hold tentative dates on the calendar when you submit the form so you don’t lose your spot.",
  },
  {
    question: "Do you supply paint or can I provide my own brand?",
    answer:
      "Our crews typically supply Benjamin Moore, Sherwin-Williams, or Cloverdale products. If you already have paint, we’ll confirm compatibility and adjust labour-only pricing.",
  },
  {
    question: "Are you insured and WCB covered?",
    answer:
      "Yes—every contractor in our network carries $5M liability coverage, WCB clearance, and up-to-date safety certifications. We send proof with each quote.",
  },
  {
    question: "Can you handle both residential and commercial projects?",
    answer:
      "We have dedicated teams for homes, multi-family, and commercial interiors/exteriors. For larger commercial scopes we stage crews to minimize downtime.",
  },
]

export function FAQ() {
  return (
    <section id="faq" className="bg-white py-20">
      <div className="container">
        <div className="mb-12 max-w-3xl">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-primary">FAQ</p>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Answers Alberta homeowners search for</h2>
          <p className="text-lg text-muted-foreground">
            We built this list from the top questions our estimators hear every day. Add your own in the form and we’ll address it on your call.
          </p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details key={faq.question} className="rounded-2xl border border-black/5 bg-white/90 p-6">
              <summary className="cursor-pointer text-lg font-semibold text-foreground">
                {faq.question}
              </summary>
              <p className="mt-3 text-muted-foreground">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
}
