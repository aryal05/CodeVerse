import { NextResponse } from "next/server";
import {
  getDb,
  handleApiError,
  mapService,
  servicePayload,
} from "@/lib/api-helpers";
import { invalidatePublicContent, PUBLIC_CACHE_TAGS } from "@/lib/cache-invalidation";

export const dynamic = "force-dynamic";

const SERVICE_LIST_COLUMNS = `
  id,
  title,
  slug,
  short_description,
  description,
  icon,
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
      .from("services")
      .select(SERVICE_LIST_COLUMNS)
      .order("order", { ascending: true, nullsFirst: false })
      .order("created_at", { ascending: false });

    if (searchParams.get("all") !== "true") query = query.eq("active", true);
    if (searchParams.get("featured") === "true")
      query = query.eq("featured", true);
    if (searchParams.get("limit"))
      query = query.limit(Number(searchParams.get("limit")));

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json((data || []).map(mapService), {
      headers: {
        "Cache-Control": "public, max-age=0, s-maxage=600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    return handleApiError(error, "Failed to fetch services");
  }
}

export async function POST(request) {
  try {
    const db = getDb();
    const body = await request.json();
    let payload = servicePayload(body, { insert: true });

    // Check if slug already exists and generate unique slug if needed
    if (payload.slug) {
      const { data: existing } = await db
        .from("services")
        .select("slug")
        .eq("slug", payload.slug)
        .single();

      if (existing) {
        // Generate unique slug by appending a number
        let counter = 1;
        let uniqueSlug = `${payload.slug}-${counter}`;
        
        while (true) {
          const { data: check } = await db
            .from("services")
            .select("slug")
            .eq("slug", uniqueSlug)
            .single();
          
          if (!check) break;
          counter++;
          uniqueSlug = `${payload.slug}-${counter}`;
        }
        
        payload.slug = uniqueSlug;
      }
    }

    const { data, error } = await db
      .from("services")
      .insert(payload)
      .select("*")
      .single();

    if (error) throw error;

    invalidatePublicContent(PUBLIC_CACHE_TAGS.services);

    return NextResponse.json(mapService(data), { status: 201 });
  } catch (error) {
    return handleApiError(error, "Failed to create service");
  }
}
