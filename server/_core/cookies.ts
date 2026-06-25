import type { CookieOptions, Request } from "express";
import { ENV } from "./env";

function isSecureRequest(req: Request) {
  if (req.protocol === "https") return true;

  const forwardedProto = req.headers["x-forwarded-proto"];
  if (!forwardedProto) return false;

  const protoList = Array.isArray(forwardedProto)
    ? forwardedProto
    : forwardedProto.split(",");

  return protoList.some((proto) => proto.trim().toLowerCase() === "https");
}

export const ANON_COOKIE_NAME = ENV.anonCookieName;
// 2 years
export const ANON_COOKIE_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 365 * 2;

export function getAnonymousCookieOptions(req: Request): CookieOptions {
  return {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: ENV.isProduction || isSecureRequest(req),
    maxAge: ANON_COOKIE_MAX_AGE_MS,
  };
}
