import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDb, verifyAuth } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

const ASSIGNABLE_ROLES = new Set(["admin", "editor", "viewer"]);

async function authorizeSuperAdmin(request) {
  const auth = verifyAuth(request);
  if (auth.error) {
    return { response: NextResponse.json({ error: auth.error }, { status: 401 }) };
  }

  const db = getDb();
  const { data: currentUser, error } = await db
    .from("users")
    .select("id, role, active")
    .eq("id", auth.user.userId)
    .maybeSingle();

  if (error) throw error;
  if (!currentUser?.active || currentUser.role !== "super_admin") {
    return {
      response: NextResponse.json(
        { error: "Super-admin access is required" },
        { status: 403 },
      ),
    };
  }

  return { db, currentUser };
}

export async function GET(request) {
  try {
    const authorization = await authorizeSuperAdmin(request);
    if (authorization.response) return authorization.response;

    const { data, error } = await authorization.db
      .from("users")
      .select("id, username, email, role, active, last_login, created_at")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return NextResponse.json(data || []);
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || "Failed to load users" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const authorization = await authorizeSuperAdmin(request);
    if (authorization.response) return authorization.response;

    const body = await request.json();
    const username = String(body.username || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");
    const role = String(body.role || "viewer");

    if (!/^[a-zA-Z0-9._-]{3,50}$/.test(username)) {
      return NextResponse.json(
        { error: "Username must be 3-50 characters and use only letters, numbers, dots, dashes, or underscores" },
        { status: 400 },
      );
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
    }
    if (!ASSIGNABLE_ROLES.has(role)) {
      return NextResponse.json({ error: "Invalid user role" }, { status: 400 });
    }

    const password_hash = await bcrypt.hash(password, 12);
    const { data, error } = await authorization.db
      .from("users")
      .insert({ username, email, password_hash, role, active: true })
      .select("id, username, email, role, active, last_login, created_at")
      .single();

    if (error?.code === "23505") {
      return NextResponse.json(
        { error: "That username or email already exists" },
        { status: 409 },
      );
    }
    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || "Failed to create user" },
      { status: 500 },
    );
  }
}
