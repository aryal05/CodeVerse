import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const cleanEnvValue = (value, key) => {
  if (!value) return undefined;
  let cleaned = String(value).trim();
  if (key && cleaned.startsWith(`${key}=`))
    cleaned = cleaned.slice(key.length + 1).trim();
  if (key && cleaned.startsWith(`export ${key}=`))
    cleaned = cleaned.slice(`export ${key}=`.length).trim();
  return cleaned.replace(/^['"]|['"]$/g, "").trim();
};

const getEnvVars = () => ({
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
});

// ─── Server-side admin client ────────────────────────────────────────────────
// Cached at module scope so we reuse the same HTTP connection pool across
// requests in the same server process (avoids a new TCP+TLS handshake per call).
// Safe because env vars are always set by the time the first request arrives.
let _adminClient = null;

export const getSupabaseAdmin = () => {
  if (_adminClient) return _adminClient;

  const { url, serviceKey } = getEnvVars();
  if (!url || !serviceKey) {
    console.error("Supabase admin env vars missing:", {
      url: !!url,
      serviceKey: !!serviceKey,
    });
    return null;
  }

  _adminClient = createSupabaseClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
    global: { fetch: fetch }, // reuse Node.js fetch connection pool
  });

  return _adminClient;
};

// Named export for direct use in server components / route handlers
export function createClient() {
  const { url, serviceKey } = getEnvVars();
  if (!url || !serviceKey)
    throw new Error("Missing Supabase environment variables");
  return getSupabaseAdmin(); // reuse cached instance
}

// Backwards compat stub (routes now call getSupabaseAdmin() at request time)
export const supabaseAdmin = null;

// ─── Browser client ──────────────────────────────────────────────────────────
export const supabase =
  typeof window !== "undefined"
    ? (() => {
        const { url, anonKey } = getEnvVars();
        if (!url || !anonKey) {
          console.error("Missing Supabase browser env vars");
          return null;
        }
        return createSupabaseClient(url, anonKey);
      })()
    : null;

export default supabase;
