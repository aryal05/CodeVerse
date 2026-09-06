import { getOptionalDb, safeImageUrl } from "@/lib/api-helpers";
import ServicesPage from "@/components/pages/ServicesPage";

export const revalidate = 120;

export const metadata = {
  title: "IT Services in Nepal",
  description:
    "Explore web development, mobile app development, UI/UX design, and digital product services from our Kathmandu-based IT team.",
  alternates: { canonical: "/services" },
};

export default async function ServicesRoute() {
  let services = [];
  try {
    const supabase = getOptionalDb();
    if (!supabase) return <ServicesPage initialServices={[]} />;
    const { data, error } = await supabase
      .from("services")
      .select(
        'id, title, slug, short_description, description, icon, image, technologies, featured, active, "order", created_at',
      )
      .eq("active", true)
      .order("order", { ascending: true });
    if (error) throw error;
    services = (data || []).map((row) => ({
      ...row,
      image: safeImageUrl(row.image),
    }));
  } catch {
    services = [];
  }
  return <ServicesPage initialServices={services} />;
}
