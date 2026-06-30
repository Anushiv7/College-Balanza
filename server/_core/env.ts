/**
 * Centralised, server-side environment configuration.
 * Read process.env once here so the rest of the codebase has a typed surface.
 */
export const ENV = {
  isProduction: process.env.NODE_ENV === "production",
  databaseUrl: process.env.DATABASE_URL ?? "",

  // OpenAI-compatible LLM endpoint (OpenAI, Groq, OpenRouter, Together, …).
  openAiApiKey: process.env.OPENAI_API_KEY ?? "",
  openAiBaseUrl:
    process.env.OPENAI_BASE_URL?.replace(/\/+$/, "") ??
    "https://api.openai.com/v1",
  openAiModel: process.env.OPENAI_MODEL ?? "gpt-4o-mini",

  // Optional search providers used by the college data fetcher.
  serperApiKey: process.env.SERPER_API_KEY ?? "",
  tavilyApiKey: process.env.TAVILY_API_KEY ?? "",

  // Optional override for the anonymous-id cookie name.
  anonCookieName: process.env.ANON_COOKIE_NAME ?? "cb_anon_id",
};
