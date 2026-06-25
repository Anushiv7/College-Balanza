import { systemRouter } from "./_core/systemRouter";
import { router } from "./_core/trpc";
import { collegesRouter } from "./routers/colleges";

export const appRouter = router({
  // All routes start with /api/trpc so the gateway can route correctly.
  system: systemRouter,
  colleges: collegesRouter,
});

export type AppRouter = typeof appRouter;
