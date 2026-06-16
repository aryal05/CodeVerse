import { NextResponse } from "next/server";
import { getDb, handleApiError } from "@/lib/api-helpers";
import bcrypt from "bcryptjs";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const forceReset = searchParams.get('forceReset') === 'true';
    const username = searchParams.get('username') || 'codeversebuild';
    const password = searchParams.get('password') || 'BuildWithCodeVerse@#$';
    
    // Create a mock request object for POST
    const mockRequest = {
      json: async () => ({ forceReset, username, password })
    };
    
    return POST(mockRequest);
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to process GET request",
        error: error.message
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const db = getDb();
    
    // Try to get username and password from body, fallback to defaults
    let username = "codeversebuild";
    let password = "BuildWithCodeVerse@#$";
    let forceReset = false;
    try {
      const body = await request.json();
      if (body.username) username = body.username;
      if (body.password) password = body.password;
      if (body.forceReset === true) forceReset = true;
    } catch {
      // JSON parse failed, use default credentials
    }

    // Check if admin already exists
    const { data: existing, error: checkError } = await db
      .from("users")
      .select("id, username, active")
      .eq("username", username)
      .maybeSingle();

    if (checkError) {
      console.error("Error checking for existing user:", checkError);
      throw checkError;
    }

    if (existing) {
      // If forceReset is true, update the password
      if (forceReset) {
        const password_hash = await bcrypt.hash(password, 10);
        
        const { error: updateError } = await db
          .from("users")
          .update({ password_hash, active: true })
          .eq("username", username);
        
        if (updateError) {
          console.error("Error updating password:", updateError);
          throw updateError;
        }
        
        return NextResponse.json({
          status: "success",
          message: "Admin password reset successfully! ✅",
          credentials: {
            username: username,
            password: password
          },
          loginUrl: "/admin",
          instructions: [
            "1. Go to http://localhost:3000/admin",
            "2. Login with the credentials above",
            "3. Change your password in Settings after first login"
          ]
        });
      }
      
      return NextResponse.json({
        status: "info",
        message: "Admin user already exists",
        credentials: {
          username: username,
          note: "User already exists. Send POST with { forceReset: true, password: 'newpassword' } to reset password"
        },
        loginUrl: "/admin",
        active: existing.active
      });
    }

    // Create password hash
    const password_hash = await bcrypt.hash(password, 10);

    // Insert new admin user
    const { data, error } = await db
      .from("users")
      .insert({
        username: username,
        email: "codeversebuild@outlook.com",
        password_hash,
        role: "admin",
        active: true,
        created_at: new Date().toISOString()
      })
      .select("id, username, role, active")
      .single();

    if (error) {
      console.error("Error creating admin user:", error);
      throw error;
    }

    return NextResponse.json(
      {
        status: "success",
        message: "Admin user created successfully! ✅",
        credentials: {
          username: username,
          password: password
        },
        loginUrl: "/admin",
        instructions: [
          "1. Go to http://localhost:3000/admin",
          "2. Login with the credentials above",
          "3. Change your password in Settings after first login"
        ]
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create admin error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to create admin user",
        error: error.message,
        details: error.toString(),
        troubleshooting: [
          "1. Check that your Supabase connection is working",
          "2. Verify the 'users' table exists in your database",
          "3. Check .env.local has correct SUPABASE credentials",
          "4. See FIX_ADMIN_LOGIN.md for manual setup"
        ]
      },
      { status: 500 }
    );
  }
}
