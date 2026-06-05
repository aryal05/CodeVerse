import { NextResponse } from "next/server";
import {
  getDb,
  handleApiError,
  mapProject,
  projectPayload,
} from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

const LIST_COLUMNS = `
  id,
  title,
  slug,
  image,
  category,
  client,
  description,
  technologies,
  created_at,
  featured,
  "order"
`;

export async function GET(request) {
  try {
    const db = getDb();
    const { searchParams } = new URL(request.url);

    let query = db
      .from("projects")
      .select(LIST_COLUMNS)
      .order("order", { ascending: true, nullsFirst: false })
      .order("created_at", { ascending: false });

    if (searchParams.get("featured") === "true") {
      query = query.eq("featured", true);
    }

    if (searchParams.get("category")) {
      query = query.eq("category", searchParams.get("category"));
    }

    if (searchParams.get("limit")) {
      query = query.limit(Number(searchParams.get("limit")));
    }

    const { data, error } = await query;

    if (error) throw error;

    return NextResponse.json((data || []).map(mapProject), {
      headers: {
        "Cache-Control": "s-maxage=300, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    return handleApiError(error, "Failed to fetch projects");
  }
}

export async function POST(request) {
  try {
    const db = getDb();
    const body = await request.json();
    const payload = projectPayload(body, { insert: true });

    const { data, error } = await db
      .from("projects")
      .insert(payload)
      .select("*")
      .single();

    if (error) throw error;

    return NextResponse.json(mapProject(data), { status: 201 });
  } catch (error) {
    return handleApiError(error, "Failed to create project");
  }
}
