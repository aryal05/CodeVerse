import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const cleanEnvValue = (value, key) => {
  if (!value) return undefined;

  let cleaned = String(value).trim();

  if (key && cleaned.startsWith(`${key}=`)) {
    cleaned = cleaned.slice(key.length + 1).trim();
  }

  if (key && cleaned.startsWith(`export ${key}=`)) {
    cleaned = cleaned.slice(`export ${key}=`.length).trim();
  }

  return cleaned.replace(/^['"]|['"]$/g, "").trim();
};

// Get environment variables at runtime.
const getEnvVars = () => {
  return {
    url: cleanEnvValue(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      "NEXT_PUBLIC_SUPABASE_URL",
    ),
    anonKey: cleanEnvValue(
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    ),
    serviceKey: cleanEnvValue(
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      "SUPABASE_SERVICE_ROLE_KEY",
    ),
  };
};

// Helper function to create a Supabase client (for server-side API routes)
export function createClient() {
  const { url, serviceKey } = getEnvVars();

  if (!url || !serviceKey) {
    console.error("Supabase environment variables missing:", {
      url: !!url,
      serviceKey: !!serviceKey,
    });
    throw new Error("Missing Supabase environment variables");
  }

  return createSupabaseClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

// Always create fresh at request time so Vercel never uses a stale module-scope value.
export const getSupabaseAdmin = () => {
  const { url, serviceKey } = getEnvVars();

  if (!url || !serviceKey) {
    console.error("Supabase admin environment variables missing:", {
      url: !!url,
      serviceKey: !!serviceKey,
    });
    return null;
  }

  return createSupabaseClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};

// For backwards compatibility. Prefer getSupabaseAdmin() inside API handlers
// so Vercel reads environment variables at request time.
export const supabaseAdmin = null;

// Supabase client for client-side (browser)
export const supabase =
  typeof window !== "undefined"
    ? (() => {
        const { url, anonKey } = getEnvVars();

        if (!url || !anonKey) {
          console.error("Missing Supabase environment variables for client");
          return null;
        }

        return createSupabaseClient(url, anonKey);
      })()
    : null;

export default supabase;
