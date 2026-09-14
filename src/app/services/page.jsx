import { getServices } from "@/lib/public-data";
import ServicesPage from "@/components/pages/ServicesPage";

export const revalidate = 600;

export const metadata = {
  title: "IT Services in Nepal",
  description:
    "Explore web development, mobile app development, UI/UX design, and digital product services from our Kathmandu-based IT team.",
  alternates: { canonical: "/services" },
};

export default async function ServicesRoute() {
  let services = [];
  try {
    services = await getServices();
  } catch {
    services = [];
  }
  return <ServicesPage initialServices={services} />;
}
