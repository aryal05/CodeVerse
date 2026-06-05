import { NextResponse } from "next/server";
import {
  byIdOrSlug,
  getDb,
  handleApiError,
  mapProject,
  notFound,
  projectPayload,
} from "@/lib/api-helpers";

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
  updated_at,
  features,
  results
`;

export async function GET(_request, context) {
  try {
    const { id } = context.params;
    const db = getDb();

    const { data, error } = await byIdOrSlug(
      db.from("projects").select(DETAIL_COLUMNS),
      id,
    ).maybeSingle();

    if (error) throw error;
    if (!data) return notFound("Project");

    return NextResponse.json(mapProject(data), {
      headers: {
        "Cache-Control": "s-maxage=300, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    return handleApiError(error, "Failed to fetch project");
  }
}

export async function PUT(request, context) {
  try {
    const { id } = context.params;
    const db = getDb();
    const body = await request.json();
    const payload = projectPayload(body);

    const { data, error } = await byIdOrSlug(
      db.from("projects").update(payload).select("*"),
      id,
    ).maybeSingle();

    if (error) throw error;
    if (!data) return notFound("Project");

    return NextResponse.json(mapProject(data));
  } catch (error) {
    return handleApiError(error, "Failed to update project");
  }
}

export async function DELETE(_request, context) {
  try {
    const { id } = context.params;
    const db = getDb();

    const { error } = await byIdOrSlug(db.from("projects").delete(), id);
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error, "Failed to delete project");
  }
}
