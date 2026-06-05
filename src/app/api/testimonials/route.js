import { NextResponse } from "next/server";
import {
  getDb,
  handleApiError,
  mapTestimonial,
  testimonialPayload,
} from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

const TESTIMONIAL_LIST_COLUMNS = `
  id,
  name,
  role,
  company,
  avatar,
  rating,
  content,
  featured,
  active,
  "order",
  created_at
`;

export async function GET(request) {
  try {
    const db = getDb();
    const { searchParams } = new URL(request.url);

    let query = db
      .from("testimonials")
      .select(TESTIMONIAL_LIST_COLUMNS)
      .eq("active", true)
      .order("order", { ascending: true, nullsFirst: false })
      .order("created_at", { ascending: false });

    if (searchParams.get("featured") === "true")
      query = query.eq("featured", true);
    if (searchParams.get("limit"))
      query = query.limit(Number(searchParams.get("limit")));

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json((data || []).map(mapTestimonial), {
      headers: {
        "Cache-Control": "s-maxage=300, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    return handleApiError(error, "Failed to fetch testimonials");
  }
}

export async function POST(request) {
  try {
    const db = getDb();
    const body = await request.json();
    const payload = testimonialPayload(body, { insert: true });

    const { data, error } = await db
      .from("testimonials")
      .insert(payload)
      .select("*")
      .single();

    if (error) throw error;

    return NextResponse.json(mapTestimonial(data), { status: 201 });
  } catch (error) {
    return handleApiError(error, "Failed to create testimonial");
  }
}
