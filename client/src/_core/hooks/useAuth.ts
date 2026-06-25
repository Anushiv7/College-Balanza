/**
 * Auth-free shim.
 *
 * The original Manus build exposed a `useAuth` hook backed by an OAuth
 * session. After the migration the app is fully anonymous — every browser is
 * implicitly "authenticated" via the `cb_anon_id` HTTP-only cookie that the
 * server sets on first request. We keep the hook's surface area so the
 * existing pages/components compile without churn, but return a static
 * anonymous identity.
 */
export type AnonUser = {
  id: "anonymous";
  name: string;
  email: null;
};

const ANON_USER: AnonUser = {
  id: "anonymous",
  name: "Guest",
  email: null,
};

export function useAuth(_options?: {
  redirectOnUnauthenticated?: boolean;
  redirectPath?: string;
}) {
  return {
    user: ANON_USER,
    loading: false,
    error: null as null,
    isAuthenticated: true as const,
    refresh: async () => undefined,
    logout: async () => undefined,
  };
}
