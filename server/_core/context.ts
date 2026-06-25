import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { randomUUID } from "node:crypto";
import type { User } from "../../drizzle/schema";
import { ANON_COOKIE_NAME, getAnonymousCookieOptions } from "./cookies";
import { upsertAnonymousUser } from "../db";

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: User | null;
  anonymousId: string;
};

/**
 * Auth-free context: we identify each browser via the `cb_anon_id` cookie
 * set by `anonymousIdMiddleware`. As a defensive fallback (e.g. if tRPC is
 * mounted before the middleware), we mint one here too.
 */
export async function createContext(
  opts: CreateExpressContextOptions
): Promise<TrpcContext> {
  let anonymousId = opts.req.anonymousId;
  if (!anonymousId) {
    anonymousId = randomUUID();
    opts.res.cookie(
      ANON_COOKIE_NAME,
      anonymousId,
      getAnonymousCookieOptions(opts.req)
    );
    opts.req.anonymousId = anonymousId;
  }

  let user: User | null = null;
  try {
    user = (await upsertAnonymousUser(anonymousId)) ?? null;
  } catch (err) {
    console.warn("[ctx] anonymous upsert failed:", err);
  }

  return {
    req: opts.req,
    res: opts.res,
    user,
    anonymousId,
  };
}
