import { unstable_cache } from "next/cache";
import {
  getOptionalDb,
  isUuid,
  mapProject,
  safeImageUrl,
} from "@/lib/api-helpers";
import { PUBLIC_CACHE_TAGS } from "@/lib/cache-tags";

const PROJECT_DETAIL_COLUMNS = `
  id,title,slug,description,full_description,category,image,gallery,
  technologies,client,duration,link,github,featured,status,"order",
  meta_title,meta_description,created_at,updated_at
`;

async function loadHomepageData() {
  const empty = { projects: [], services: [], testimonials: [], pricing: [] };
  const db = getOptionalDb();
  if (!db) return empty;

  const [projectsRes, servicesRes, testimonialsRes, pricingRes] = await Promise.all([
    db.from("projects")
      .select("id,title,slug,category,client,description,link,image,created_at")
      .eq("featured", true)
      .order("order", { ascending: true, nullsFirst: false })
      .order("created_at", { ascending: false })
      .limit(8),
    db.from("services")
      .select("id,title,slug,short_description,description,icon")
      .eq("active", true)
      .eq("featured", true)
      .order("order", { ascending: true, nullsFirst: false })
      .order("created_at", { ascending: false })
      .limit(3),
    db.from("testimonials")
      .select("id,name,role,company,content,rating")
      .eq("active", true)
      .order("order", { ascending: true, nullsFirst: false })
      .order("created_at", { ascending: false })
      .limit(3),
    db.from("pricing_plans")
      .select("*")
      .eq("is_active", true)
      .order("order", { ascending: true })
      .limit(3),
  ]);

  if (projectsRes.error) throw projectsRes.error;
  if (servicesRes.error) throw servicesRes.error;
  if (testimonialsRes.error) throw testimonialsRes.error;

  return {
    projects: (projectsRes.data || []).map((row) => ({
      id: row.id,
      title: row.title,
      slug: row.slug,
      image: safeImageUrl(row.image),
      category: row.category,
      client: row.client,
      description: row.description,
      link: row.link,
      createdAt: row.created_at,
      technologies: [],
    })),
    services: servicesRes.data || [],
    testimonials: testimonialsRes.data || [],
    pricing: (pricingRes.data || []).map(normalizePricingPlan),
  };
}

async function loadServices() {
  const db = getOptionalDb();
  if (!db) return [];
  const { data, error } = await db.from("services")
    .select('id,title,slug,short_description,description,icon,image,technologies,features,featured,active,"order",created_at')
    .eq("active", true)
    .order("order", { ascending: true });
  if (error) throw error;
  return (data || []).map((row) => ({ ...row, image: safeImageUrl(row.image) }));
}

async function loadService(slug) {
  const db = getOptionalDb();
  if (!db) return null;
  const { data, error } = await db.from("services").select("*").eq("slug", slug).maybeSingle();
  if (error) throw error;
  return data || null;
}

async function loadProjects() {
  const db = getOptionalDb();
  if (!db) return [];
  const { data, error } = await db.from("projects")
    .select('id,title,slug,description,category,technologies,client,link,image,created_at,featured,status,"order"')
    .order("order", { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data || []).map((row) => ({
    ...row,
    _id: row.id,
    createdAt: row.created_at,
    image: safeImageUrl(row.image),
  }));
}

async function loadProject(id) {
  const db = getOptionalDb();
  if (!db) return null;
  const query = isUuid(id)
    ? db.from("projects").select(PROJECT_DETAIL_COLUMNS).eq("id", id)
    : db.from("projects").select(PROJECT_DETAIL_COLUMNS).eq("slug", id);
  const { data, error } = await query.maybeSingle();
  if (error) throw error;
  return data ? mapProject(data) : null;
}

function normalizePricingPlan(plan) {
  return {
    ...plan,
    features: plan.features || [],
    highlighted_features: plan.highlighted_features || [],
    not_included: plan.not_included || [],
  };
}

async function loadPricingPlans() {
  const db = getOptionalDb();
  if (!db) return [];
  const { data, error } = await db.from("pricing_plans")
    .select("*")
    .eq("is_active", true)
    .order("order", { ascending: true });
  if (error) throw error;
  return (data || []).map(normalizePricingPlan);
}

export const getHomepageData = unstable_cache(loadHomepageData, ["homepage-data-v2"], {
  revalidate: 300,
  tags: Object.values(PUBLIC_CACHE_TAGS),
});

export const getServices = unstable_cache(loadServices, ["services-list-v2"], {
  revalidate: 600,
  tags: [PUBLIC_CACHE_TAGS.services],
});

export const getService = unstable_cache(loadService, ["service-detail-v2"], {
  revalidate: 600,
  tags: [PUBLIC_CACHE_TAGS.services],
});

export const getProjects = unstable_cache(loadProjects, ["projects-list-v2"], {
  revalidate: 600,
  tags: [PUBLIC_CACHE_TAGS.projects],
});

export const getProject = unstable_cache(loadProject, ["project-detail-v2"], {
  revalidate: 600,
  tags: [PUBLIC_CACHE_TAGS.projects],
});

export const getPricingPlans = unstable_cache(loadPricingPlans, ["pricing-list-v2"], {
  revalidate: 600,
  tags: [PUBLIC_CACHE_TAGS.pricing],
});
