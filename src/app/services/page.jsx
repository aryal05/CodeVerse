import { createClient } from "@/lib/supabase";
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
      .select("*")
      .eq("active", true)
      .order("order", { ascending: true });
    services = data || [];
  } catch (e) {
    services = [];
  }
  return <ServicesPage initialServices={services} />;
}
