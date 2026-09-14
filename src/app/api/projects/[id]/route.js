import { NextResponse } from "next/server";
import {
  byIdOrSlug,
  getDb,
  handleApiError,
  mapProject,
  notFound,
  projectPayload,
  safeImageUrl,
} from "@/lib/api-helpers";
import { invalidatePublicContent, PUBLIC_CACHE_TAGS } from "@/lib/cache-invalidation";

export const dynamic = "force-dynamic";

const DETAIL_COLUMNS = `
  id,
  title,
  slug,
  description,
  full_description,
  category,
  image,
  gallery,
  technologies,
  client,
  duration,
  link,
  github,
  featured,
  status,
  "order",
  meta_title,
  meta_description,
  created_at,
  updated_at
`;

export async function GET(_request, context) {
  try {
    const { id } = await context.params;
    const db = getDb();

    const { data, error } = await byIdOrSlug(
      db.from("projects").select(DETAIL_COLUMNS),
      id,
    ).maybeSingle();

    if (error) throw error;
    if (!data) return notFound("Project");

    return NextResponse.json(mapProject(data), {
      headers: {
        "Cache-Control": "public, max-age=0, s-maxage=600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    return handleApiError(error, "Failed to fetch project");
  }
}

export async function PUT(request, context) {
  try {
    const { id } = await context.params;
    const db = getDb();
    const body = await request.json();
    const payload = projectPayload(body);

    const { data, error } = await byIdOrSlug(
      db.from("projects").update(payload).select("*"),
      id,
    ).maybeSingle();

    if (error) throw error;
    if (!data) return notFound("Project");

    invalidatePublicContent(PUBLIC_CACHE_TAGS.projects);

    return NextResponse.json(mapProject(data));
  } catch (error) {
    return handleApiError(error, "Failed to update project");
  }
}

export async function DELETE(_request, context) {
  try {
    const { id } = await context.params;
    const db = getDb();

    const { error } = await byIdOrSlug(db.from("projects").delete(), id);
    if (error) throw error;

    invalidatePublicContent(PUBLIC_CACHE_TAGS.projects);

    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error, "Failed to delete project");
  }
}
