import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import dns from "node:dns";
import { Agent } from "undici";

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

export const getSupabaseConfigStatus = () => {
  const { url, anonKey, serviceKey } = getEnvVars();
  return {
    serverConfigured: Boolean(url && serviceKey),
    browserConfigured: Boolean(url && anonKey),
  };
};

// Server-side admin client
// Cached at module scope so we reuse the same HTTP connection pool across
// requests in the same server process (avoids a new TCP+TLS handshake per call).
// Safe because env vars are always set by the time the first request arrives.
let _adminClient = null;

// Wrap fetch with a 30-second timeout to prevent infinite hangs from
// large base64 image payloads causing ECONNRESET retry loops.
const FETCH_TIMEOUT_MS = 30_000;

// Some Windows DNS filters reject Supabase through getaddrinfo even though a
// direct DNS query succeeds. Keep the normal system resolver first, then use
// an IPv4 DNS query as a narrow server-side fallback.
const supabaseDispatcher = new Agent({
  connect: {
    lookup(hostname, options, callback) {
      dns.lookup(hostname, options, (lookupError, address, family) => {
        if (!lookupError) {
          callback(null, address, family);
          return;
        }

        dns.resolve4(hostname, (resolveError, addresses) => {
          if (resolveError || !addresses?.length) {
            callback(lookupError);
            return;
          }

          if (options?.all) {
            callback(
              null,
              addresses.map((resolvedAddress) => ({
                address: resolvedAddress,
                family: 4,
              })),
            );
            return;
          }

          callback(null, addresses[0], 4);
        });
      });
    },
  },
});

function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  return fetch(url, {
    ...options,
    signal: controller.signal,
    dispatcher: supabaseDispatcher,
  }).finally(() => clearTimeout(timeoutId));
}

export const getSupabaseAdmin = () => {
  if (_adminClient) return _adminClient;

  const { url, serviceKey } = getEnvVars();
  if (!url || !serviceKey) {
    return null;
  }

  _adminClient = createSupabaseClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
    global: { fetch: fetchWithTimeout },
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

// Browser client
export const supabase =
  typeof window !== "undefined"
    ? (() => {
        const { url, anonKey } = getEnvVars();
        if (!url || !anonKey) {
          return null;
        }
        return createSupabaseClient(url, anonKey);
      })()
    : null;

export default supabase;
