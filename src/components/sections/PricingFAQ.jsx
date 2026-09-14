import { ArrowUpRight, HelpCircle, Plus } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    q: "What is included in the pricing?",
    a: "Every package covers design, development, testing, deployment, mobile responsiveness, initial SEO setup, and the support period shown in the plan.",
  },
  {
    q: "Do you offer payment plans?",
    a: "Yes. Most projects use a 50% kickoff payment and 50% on completion. Larger engagements can be divided into clear milestone payments.",
  },
  {
    q: "What if I need features that are not listed?",
    a: "We will prepare a tailored proposal around your requirements, integrations, timeline, and expected business outcomes.",
  },
  {
    q: "How long does a project take?",
    a: "Basic websites usually take 2–3 weeks, advanced projects 4–6 weeks, and larger custom platforms typically 8–12 weeks depending on scope.",
  },
  {
    q: "Do you provide hosting and domains?",
    a: "We help select and configure the right domain and hosting setup. Third-party hosting and domain fees are billed separately for full ownership and transparency.",
  },
  {
    q: "What happens after launch?",
    a: "Your plan includes a complimentary support period. Afterward, optional maintenance plans cover updates, monitoring, backups, and ongoing improvements.",
  },
];

export default function PricingFAQ() {
  return (
    <section className="pricing-faq">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="pricing-faq__layout">
          <div className="pricing-faq__intro">
            <span className="pricing-faq__eyebrow"><HelpCircle aria-hidden="true" /> Pricing clarity</span>
            <h2>Questions before<br /><em>we begin?</em></h2>
            <p>Clear scope, transparent payments, and no surprises. Here are the answers clients usually need before starting.</p>
            <Link href="/contact">Ask us directly <ArrowUpRight aria-hidden="true" /></Link>
          </div>

          <div className="pricing-faq__list">
            {faqs.map((faq, index) => (
              <details className="pricing-faq__item" key={faq.q} open={index === 0}>
                <summary>
                  <span className="pricing-faq__number">{String(index + 1).padStart(2, "0")}</span>
                  <span>{faq.q}</span>
                  <i><Plus aria-hidden="true" /></i>
                </summary>
                <div className="pricing-faq__answer"><p>{faq.a}</p></div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
