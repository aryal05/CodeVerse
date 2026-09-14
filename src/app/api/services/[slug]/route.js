import { NextResponse } from "next/server";
import {
  byIdOrSlug,
  getDb,
  handleApiError,
  mapService,
  notFound,
  servicePayload,
} from "@/lib/api-helpers";
import { invalidatePublicContent, PUBLIC_CACHE_TAGS } from "@/lib/cache-invalidation";

export const dynamic = "force-dynamic";

export async function GET(_request, context) {
  try {
    const { slug } = await context.params;
    const db = getDb();

    const { data, error } = await byIdOrSlug(
      db.from("services").select("*"),
      slug,
    ).maybeSingle();

    if (error) throw error;
    if (!data) return notFound("Service");

    return NextResponse.json(mapService(data), {
      headers: {
        "Cache-Control": "public, max-age=0, s-maxage=600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    return handleApiError(error, "Failed to fetch service");
  }
}

export async function PUT(request, context) {
  try {
    const { slug } = await context.params;
    const db = getDb();
    const body = await request.json();
    const payload = servicePayload(body);

    const { data, error } = await byIdOrSlug(
      db.from("services").update(payload).select("*"),
      slug,
    ).maybeSingle();

    if (error) throw error;
    if (!data) return notFound("Service");

    invalidatePublicContent(PUBLIC_CACHE_TAGS.services);

    return NextResponse.json(mapService(data));
  } catch (error) {
    return handleApiError(error, "Failed to update service");
  }
}

export async function DELETE(_request, context) {
  try {
    const { slug } = await context.params;
    const db = getDb();

    const { error } = await byIdOrSlug(db.from("services").delete(), slug);
    if (error) throw error;

    invalidatePublicContent(PUBLIC_CACHE_TAGS.services);

    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error, "Failed to delete service");
  }
}
