import "dotenv/config";
import cookieParser from "cookie-parser";
import express, { type Express, type Request, type Response } from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { anonymousIdMiddleware } from "./middleware/anonymous";
import { appRouter } from "../routers";
import { createContext } from "./context";

/**
 * Build the Express app. Exported as a factory so it can be reused by:
 *   - the local dev runner (`server/_core/dev.ts`)
 *   - the Vercel serverless entry (`api/index.ts`)
 */
export function createApp(): Express {
  const app = express();

  app.use(cookieParser());
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ limit: "10mb", extended: true }));
  app.use(anonymousIdMiddleware);

  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  app.get("/api/health", (_req: Request, res: Response) => {
    res.json({ ok: true });
  });

  return app;
}