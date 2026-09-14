import { NextResponse } from "next/server";
import {
  getDb,
  handleApiError,
  mapTestimonial,
  notFound,
  testimonialPayload,
} from "@/lib/api-helpers";
import { invalidatePublicContent, PUBLIC_CACHE_TAGS } from "@/lib/cache-invalidation";

export const dynamic = "force-dynamic";

export async function GET(_request, context) {
  try {
    const { id } = await context.params;
    const db = getDb();

    const { data, error } = await db
      .from("testimonials")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) throw error;
    if (!data) return notFound("Testimonial");

    invalidatePublicContent(PUBLIC_CACHE_TAGS.testimonials);

    return NextResponse.json(mapTestimonial(data));
  } catch (error) {
    return handleApiError(error, "Failed to fetch testimonial");
  }
}

export async function PUT(request, context) {
  try {
    const { id } = await context.params;
    const db = getDb();
    const body = await request.json();
    const payload = testimonialPayload(body);

    const { data, error } = await db
      .from("testimonials")
      .update(payload)
      .eq("id", id)
      .select("*")
      .maybeSingle();

    if (error) throw error;
    if (!data) return notFound("Testimonial");

    return NextResponse.json(mapTestimonial(data));
  } catch (error) {
    return handleApiError(error, "Failed to update testimonial");
  }
}

export async function DELETE(_request, context) {
  try {
    const { id } = await context.params;
    const db = getDb();

    const { error } = await db.from("testimonials").delete().eq("id", id);
    if (error) throw error;

    invalidatePublicContent(PUBLIC_CACHE_TAGS.testimonials);

    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error, "Failed to delete testimonial");
  }
}
