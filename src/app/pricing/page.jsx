import { getPricingPlans } from "@/lib/public-data";
import PageHeader from "@/components/ui/PageHeader";
import Pricing from "@/components/sections/Pricing";
import CTA from "@/components/sections/CTA";
import PricingFAQ from "@/components/sections/PricingFAQ";

export const revalidate = 600;

export const metadata = {
  title: "Web Development Pricing in Nepal",
  description:
    "Transparent pricing for web development services. From basic websites to enterprise solutions. Find the perfect package for your project.",
  keywords: [
    "web development pricing",
    "website packages",
    "web design cost",
    "nepal web development",
    "affordable website",
  ],
  alternates: { canonical: "/pricing" },
};

export default async function PricingPage() {
  let plans = [];
  try { plans = await getPricingPlans(); } catch {}

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <PageHeader
        badge="Pricing"
        title="Transparent"
        titleHighlight="Pricing Plans"
        description="Choose the perfect package for your project. All plans include our commitment to quality, timely delivery, and dedicated support."
      />

      <Pricing plans={plans} />

      <PricingFAQ />

      <CTA />
    </div>
  );
}
