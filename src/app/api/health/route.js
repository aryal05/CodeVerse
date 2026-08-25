import { NextResponse } from "next/server";
import { getDb } from "@/lib/api-helpers";
import { getSupabaseConfigStatus } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  const config = getSupabaseConfigStatus();
  const env = {
    NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    JWT_SECRET: !!process.env.JWT_SECRET,
    NEXT_PUBLIC_SITE_URL: !!process.env.NEXT_PUBLIC_SITE_URL,
  };

  if (!config.serverConfigured) {
    return NextResponse.json(
      {
        status: "configuration_required",
        message: "Supabase server credentials are not configured.",
        env,
      },
      { status: 503 },
    );
  }

  try {
    const db = getDb();

    const { error } = await db.from("projects").select("id").limit(1);

    if (error) {
      return NextResponse.json(
        {
          status: "error",
          message: "Database query failed",
          error: error.message,
          env,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      status: "ok",
      message: "All systems operational",
      database: "connected",
      env,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: error.message,
        hint: "Check that all Supabase env vars are set correctly in Vercel",
        env,
      },
      { status: 500 },
    );
  }
}
