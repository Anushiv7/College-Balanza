import { Request, Response, NextFunction } from "express";
import { randomUUID } from "node:crypto";
import { ANON_COOKIE_NAME, getAnonymousCookieOptions } from "../cookies";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Ensures every request has an anonymous UUID stored in an HTTP-only cookie.
 * The UUID is used to scope per-browser data (comparison history, etc.)
 * without requiring any authentication.
 */
export function anonymousIdMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const cookies = (req as Request & { cookies?: Record<string, string> })
    .cookies;
  const existing = cookies?.[ANON_COOKIE_NAME];

  if (existing && UUID_RE.test(existing)) {
    req.anonymousId = existing;
  } else {
    const uuid = randomUUID();
    res.cookie(ANON_COOKIE_NAME, uuid, getAnonymousCookieOptions(req));
    req.anonymousId = uuid;
  }
  next();
}
