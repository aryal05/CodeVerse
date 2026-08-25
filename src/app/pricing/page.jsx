import { getOptionalDb } from "@/lib/api-helpers";
import PageHeader from "@/components/ui/PageHeader";
import Pricing from "@/components/sections/Pricing";
import CTA from "@/components/sections/CTA";

export const revalidate = 60;

export const metadata = {
  title: "Pricing - CodeVerse | Web Development Packages",
  description:
    "Transparent pricing for web development services. From basic websites to enterprise solutions. Find the perfect package for your project.",
  keywords: [
    "web development pricing",
    "website packages",
    "web design cost",
    "nepal web development",
    "affordable website",
  ],
};

async function getPricingData() {
  try {
    const db = getOptionalDb();
    if (!db) return [];

    const { data, error } = await db
      .from("pricing_plans")
      .select("*")
      .eq("is_active", true)
      .order("order", { ascending: true });

    if (error) throw error;

    return (data || []).map((plan) => ({
      ...plan,
      features: plan.features || [],
      highlighted_features: plan.highlighted_features || [],
      not_included: plan.not_included || [],
    }));
  } catch {
    return [];
  }
}

export default async function PricingPage() {
  const plans = await getPricingData();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <PageHeader
        badge="Pricing"
        title="Transparent"
        titleHighlight="Pricing Plans"
        description="Choose the perfect package for your project. All plans include our commitment to quality, timely delivery, and dedicated support."
      />

      <Pricing plans={plans} />

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              {[
                {
                  q: "What's included in the pricing?",
                  a: "Each package includes design, development, testing, and deployment. We also include initial SEO setup, mobile responsiveness, and free support period as mentioned in each plan.",
                },
                {
                  q: "Do you offer payment plans?",
                  a: "Yes! We typically split payments into 50% upfront and 50% upon completion. For larger projects, we can arrange milestone-based payments.",
                },
                {
                  q: "What if I need features not listed?",
                  a: "No problem! Contact us for a custom quote. We'll discuss your specific requirements and provide a tailored proposal.",
                },
                {
                  q: "How long does a project take?",
                  a: "Basic websites typically take 2-3 weeks. Full Advanced projects take 4-6 weeks. Custom Enterprise projects vary based on complexity, usually 8-12 weeks.",
                },
                {
                  q: "Do you provide hosting and domain?",
                  a: "We help you set up hosting and domain, but these are typically separate costs. We recommend the best options based on your project needs.",
                },
                {
                  q: "What about ongoing maintenance?",
                  a: "Each plan includes a free support period. After that, we offer affordable monthly maintenance plans starting from NPR 2,000/month.",
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {faq.q}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
}
