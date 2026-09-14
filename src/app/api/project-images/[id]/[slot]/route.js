import { NextResponse } from "next/server";
import { arrayValue, byIdOrSlug, getDb } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

const DATA_IMAGE_PATTERN = /^data:(image\/[a-z0-9.+-]+);base64,([\s\S]+)$/i;
const SAFE_IMAGE_TYPES = new Set([
  "image/avif",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

export async function GET(_request, { params }) {
  const { id, slot } = await params;

  try {
    const db = getDb();
    const query = byIdOrSlug(
      db.from("projects").select("image,gallery").limit(1),
      id,
    );
    const { data, error } = await query.maybeSingle();

    if (error) throw error;
    if (!data) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const gallery = arrayValue(data.gallery);
    const source = slot === "cover" ? data.image : gallery[Number(slot)];
    const match = String(source || "").match(DATA_IMAGE_PATTERN);

    if (!match || !SAFE_IMAGE_TYPES.has(match[1].toLowerCase())) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    return new Response(Buffer.from(match[2], "base64"), {
      headers: {
        "Content-Type": match[1].toLowerCase(),
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Security-Policy": "default-src 'none'",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Failed to load project image", error);
    return NextResponse.json(
      { error: "Failed to load project image" },
      { status: 500 },
    );
  }
}
