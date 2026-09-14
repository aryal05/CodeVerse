import { NextResponse } from "next/server";
import { getDb, handleApiError, verifyAuth } from "@/lib/api-helpers";
import { invalidatePublicContent, PUBLIC_CACHE_TAGS } from "@/lib/cache-invalidation";

export const dynamic = "force-dynamic";

// GET - Fetch single pricing plan by ID
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const db = getDb();

    const { data, error } = await db
      .from("pricing_plans")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    if (!data) {
      return NextResponse.json(
        { error: "Pricing plan not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ...data,
      features: data.features || [],
      highlighted_features: data.highlighted_features || [],
      not_included: data.not_included || [],
    });
  } catch (error) {
    return handleApiError(error, "Failed to fetch pricing plan");
  }
}

// PUT - Update pricing plan (Admin only)
export async function PUT(request, { params }) {
  try {
    const authResult = verifyAuth(request);
    if (authResult.error) {
      return NextResponse.json({ error: authResult.error }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const db = getDb();

    const updateData = {};

    // Only update fields that are provided
    if (body.name !== undefined) updateData.name = body.name;
    if (body.slug !== undefined) updateData.slug = body.slug;
    if (body.tagline !== undefined) updateData.tagline = body.tagline;
    if (body.description !== undefined) updateData.description = body.description;
    if (body.price_min !== undefined) updateData.price_min = parseInt(body.price_min);
    if (body.price_max !== undefined) updateData.price_max = body.price_max ? parseInt(body.price_max) : null;
    if (body.price_display !== undefined) updateData.price_display = body.price_display;
    if (body.currency !== undefined) updateData.currency = body.currency;
    if (body.billing_period !== undefined) updateData.billing_period = body.billing_period;
    if (body.features !== undefined) updateData.features = body.features;
    if (body.highlighted_features !== undefined) updateData.highlighted_features = body.highlighted_features;
    if (body.not_included !== undefined) updateData.not_included = body.not_included;
    if (body.badge !== undefined) updateData.badge = body.badge;
    if (body.badge_color !== undefined) updateData.badge_color = body.badge_color;
    if (body.button_text !== undefined) updateData.button_text = body.button_text;
    if (body.button_link !== undefined) updateData.button_link = body.button_link;
    if (body.is_featured !== undefined) updateData.is_featured = body.is_featured;
    if (body.is_popular !== undefined) updateData.is_popular = body.is_popular;
    if (body.is_active !== undefined) updateData.is_active = body.is_active;
    if (body.order !== undefined) updateData.order = parseInt(body.order);
    if (body.icon !== undefined) updateData.icon = body.icon;
    if (body.gradient_from !== undefined) updateData.gradient_from = body.gradient_from;
    if (body.gradient_to !== undefined) updateData.gradient_to = body.gradient_to;

    const { data, error } = await db
      .from("pricing_plans")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    if (!data) {
      return NextResponse.json(
        { error: "Pricing plan not found" },
        { status: 404 }
      );
    }

    invalidatePublicContent(PUBLIC_CACHE_TAGS.pricing);

    return NextResponse.json(data);
  } catch (error) {
    return handleApiError(error, "Failed to update pricing plan");
  }
}

// DELETE - Delete pricing plan (Admin only)
export async function DELETE(request, { params }) {
  try {
    const authResult = verifyAuth(request);
    if (authResult.error) {
      return NextResponse.json({ error: authResult.error }, { status: 401 });
    }

    const { id } = await params;
    const db = getDb();

    const { error } = await db
      .from("pricing_plans")
      .delete()
      .eq("id", id);

    if (error) throw error;

    invalidatePublicContent(PUBLIC_CACHE_TAGS.pricing);

    return NextResponse.json({ success: true, message: "Pricing plan deleted" });
  } catch (error) {
    return handleApiError(error, "Failed to delete pricing plan");
  }
}
