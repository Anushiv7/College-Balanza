import { createApp } from "../server/_core/index";

// Vercel's `@vercel/node` runtime accepts an Express app as the default export.
const app = createApp();

export default app;
