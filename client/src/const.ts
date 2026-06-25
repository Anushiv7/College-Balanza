export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

/**
 * Auth-free build. No OAuth portal exists; this helper is retained only so
 * legacy imports keep compiling. It returns the current origin which is a
 * safe no-op redirect.
 */
export const getLoginUrl = () =>
  typeof window === "undefined" ? "/" : window.location.origin + "/";
