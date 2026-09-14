import { NextResponse } from "next/server";
import { getDb, handleApiError, verifyAuth } from "@/lib/api-helpers";
import { invalidatePublicContent, PUBLIC_CACHE_TAGS } from "@/lib/cache-invalidation";

export const dynamic = "force-dynamic";

// GET - Fetch all pricing plans
export async function GET(request) {
  try {
    const db = getDb();
    const { searchParams } = new URL(request.url);
    const all = searchParams.get("all") === "true";

    let query = db
      .from("pricing_plans")
      .select("*")
      .order("order", { ascending: true });

    // Only show active plans for public, show all for admin
    if (!all) {
      query = query.eq("is_active", true);
    }

    const { data, error } = await query;

    if (error) throw error;

    // Parse JSONB fields
    const plans = (data || []).map((plan) => ({
      ...plan,
      features: plan.features || [],
      highlighted_features: plan.highlighted_features || [],
      not_included: plan.not_included || [],
    }));

    return NextResponse.json(plans, {
      headers: {
        "Cache-Control": all
          ? "private, no-store"
          : "public, max-age=0, s-maxage=600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    return handleApiError(error, "Failed to fetch pricing plans");
  }
}

// POST - Create new pricing plan (Admin only)
export async function POST(request) {
  try {
    const authResult = verifyAuth(request);
    if (authResult.error) {
      return NextResponse.json({ error: authResult.error }, { status: 401 });
    }

    const body = await request.json();
    const db = getDb();

    // Create slug from name if not provided
    const slug = body.slug || body.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

    const planData = {
      name: body.name,
      slug,
      tagline: body.tagline || "",
      description: body.description || "",
      price_min: parseInt(body.price_min) || 0,
      price_max: body.price_max ? parseInt(body.price_max) : null,
      price_display: body.price_display || `${body.price_min}K`,
      currency: body.currency || "NPR",
      billing_period: body.billing_period || "one-time",
      features: body.features || [],
      highlighted_features: body.highlighted_features || [],
      not_included: body.not_included || [],
      badge: body.badge || null,
      badge_color: body.badge_color || "primary",
      button_text: body.button_text || "Get Started",
      button_link: body.button_link || "/contact",
      is_featured: body.is_featured || false,
      is_popular: body.is_popular || false,
      is_active: body.is_active !== false,
      order: parseInt(body.order) || 0,
      icon: body.icon || "package",
      gradient_from: body.gradient_from || "blue-500",
      gradient_to: body.gradient_to || "cyan-500",
    };

    const { data, error } = await db
      .from("pricing_plans")
      .insert(planData)
      .select()
      .single();

    if (error) throw error;

    invalidatePublicContent(PUBLIC_CACHE_TAGS.pricing);

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return handleApiError(error, "Failed to create pricing plan");
  }
}
