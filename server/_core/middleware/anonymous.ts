import { Request, Response, NextFunction } from "express";
import { randomUUID } from "node:crypto";
import { getAnonymousCookieOptions, ANON_COOKIE_NAME } from "../cookies";

export function anonymousIdMiddleware(req: Request, res: Response, next: NextFunction) {
  const existing = req.cookies[ANON_COOKIE_NAME];
  if (!existing) {
    const uuid = randomUUID();
    res.cookie(ANON_COOKIE_NAME, uuid, getAnonymousCookieOptions(req));
    req.anonymousId = uuid;
  } else {
    req.anonymousId = existing;
  }
  next();
}
