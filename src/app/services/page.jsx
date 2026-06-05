import { createClient } from "@/lib/supabase";
import { safeImageUrl } from "@/lib/api-helpers";
import ServicesPage from "@/components/pages/ServicesPage";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Our Services - CodeVerse",
  description:
    "Web Development, Mobile Apps, UI/UX Design, and more. Explore our premium digital services.",
};

export default async function ServicesRoute() {
  let services = [];
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("services")
      .select(
        'id, title, slug, short_description, description, icon, image, technologies, featured, active, "order", created_at',
      )
      .eq("active", true)
      .order("order", { ascending: true });
    services = (data || []).map((row) => ({
      ...row,
      image: safeImageUrl(row.image),
    }));
  } catch (e) {
    services = [];
  }
  return <ServicesPage initialServices={services} />;
}
