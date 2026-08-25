import { getOptionalDb, safeImageUrl } from "@/lib/api-helpers";
import ServicesPage from "@/components/pages/ServicesPage";

export const revalidate = 120;

export const metadata = {
  title: "Our Services - CodeVerse",
  description:
    "Web Development, Mobile Apps, UI/UX Design, and more. Explore our premium digital services.",
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
