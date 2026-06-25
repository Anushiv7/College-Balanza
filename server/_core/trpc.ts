import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import type { TrpcContext } from "./context";

const t = initTRPC.context<TrpcContext>().create({
  transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;

/**
 * Anonymous procedure: every request is identified by the anonymous UUID
 * cookie. There is no login; this just guarantees `ctx.anonymousId` is set.
 */
export const anonymousProcedure = t.procedure.use(
  t.middleware(async ({ ctx, next }) => {
    return next({
      ctx: {
        ...ctx,
        anonymousId: ctx.anonymousId,
      },
    });
  })
);
