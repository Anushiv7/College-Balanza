import { ENV } from "./env";

export type Role = "system" | "user" | "assistant" | "tool" | "function";

export type TextContent = {
  type: "text";
  text: string;
};

export type ImageContent = {
  type: "image_url";
  image_url: {
    url: string;
    detail?: "auto" | "low" | "high";
  };
};

export type FileContent = {
  type: "file_url";
  file_url: {
    url: string;
    mime_type?: "audio/mpeg" | "audio/wav" | "application/pdf" | "audio/mp4" | "video/mp4" ;
  };
};

export type MessageContent = string | TextContent | ImageContent | FileContent;

export type Message = {
  role: Role;
  content: MessageContent | MessageContent[];
  name?: string;
  tool_call_id?: string;
};

export type Tool = {
  type: "function";
  function: {
    name: string;
    description?: string;
    parameters?: Record<string, unknown>;
  };
};

export type ToolChoicePrimitive = "none" | "auto" | "required";
export type ToolChoiceByName = { name: string };
export type ToolChoiceExplicit = {
  type: "function";
  function: {
    name: string;
  };
};

export type ToolChoice =
  | ToolChoicePrimitive
  | ToolChoiceByName
  | ToolChoiceExplicit;

export type InvokeParams = {
  messages: Message[];
  tools?: Tool[];
  toolChoice?: ToolChoice;
  tool_choice?: ToolChoice;
  maxTokens?: number;
  max_tokens?: number;
  outputSchema?: OutputSchema;
  output_schema?: OutputSchema;
  responseFormat?: ResponseFormat;
  response_format?: ResponseFormat;
  model?: string;
  thinking?: Record<string, unknown>;
  reasoning?: Record<string, unknown>;
};

export type ToolCall = {
  id: string;
  type: "function";
  function: {
    name: string;
    arguments: string;
  };
};

export type InvokeResult = {
  id: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: Role;
      content: string | Array<TextContent | ImageContent | FileContent>;
      tool_calls?: ToolCall[];
    };
    finish_reason: string | null;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
};

export type JsonSchema = {
  name: string;
  schema: Record<string, unknown>;
  strict?: boolean;
};

export type OutputSchema = JsonSchema;

export type ResponseFormat =
  | { type: "text" }
  | { type: "json_object" }
  | { type: "json_schema"; json_schema: JsonSchema };

const ensureArray = (
  value: MessageContent | MessageContent[]
): MessageContent[] => (Array.isArray(value) ? value : [value]);

const normalizeContentPart = (
  part: MessageContent
): TextContent | ImageContent | FileContent => {
  if (typeof part === "string") {
    return { type: "text", text: part };
  }

  if (part.type === "text") {
    return part;
  }

  if (part.type === "image_url") {
    return part;
  }

  if (part.type === "file_url") {
    return part;
  }

  throw new Error("Unsupported message content part");
};

const normalizeMessage = (message: Message) => {
  const { role, name, tool_call_id } = message;

  if (role === "tool" || role === "function") {
    const content = ensureArray(message.content)
      .map(part => (typeof part === "string" ? part : JSON.stringify(part)))
      .join("\n");

    return {
      role,
      name,
      tool_call_id,
      content,
    };
  }

  const contentParts = ensureArray(message.content).map(normalizeContentPart);

  // If there's only text content, collapse to a single string for compatibility
  if (contentParts.length === 1 && contentParts[0].type === "text") {
    return {
      role,
      name,
      content: contentParts[0].text,
    };
  }

  return {
    role,
    name,
    content: contentParts,
  };
};

const normalizeToolChoice = (
  toolChoice: ToolChoice | undefined,
  tools: Tool[] | undefined
): "none" | "auto" | ToolChoiceExplicit | undefined => {
  if (!toolChoice) return undefined;

  if (toolChoice === "none" || toolChoice === "auto") {
    return toolChoice;
  }

  if (toolChoice === "required") {
    if (!tools || tools.length === 0) {
      throw new Error(
        "tool_choice 'required' was provided but no tools were configured"
      );
    }

    if (tools.length > 1) {
      throw new Error(
        "tool_choice 'required' needs a single tool or specify the tool name explicitly"
      );
    }

    return {
      type: "function",
      function: { name: tools[0].function.name },
    };
  }

  if ("name" in toolChoice) {
    return {
      type: "function",
      function: { name: toolChoice.name },
    };
  }

  return toolChoice;
};

let isOpenAiQuotaExceeded = false;
let isGeminiServiceUnavailable = false;

function determineProvider(): "gemini" | "openai" {
  if (process.env.GEMINI_API_KEY && !isGeminiServiceUnavailable) {
    return "gemini";
  }
  return "openai";
}

const assertApiKey = (provider: "gemini" | "openai") => {
  if (provider === "gemini") {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not configured in the environment");
    }
  } else {
    if (!ENV.openAiApiKey) {
      throw new Error("OPENAI_API_KEY is not configured in the environment");
    }
    if (isOpenAiQuotaExceeded) {
      throw new Error("OpenAI requests blocked: OpenAI API key has insufficient quota (429 insufficient_quota)");
    }
  }
};

async function checkOpenAiQuotaError(response: Response, provider: "gemini" | "openai") {
  if (provider === "openai" && (response.status === 429 || response.status === 400)) {
    try {
      const clone = response.clone();
      const bodyText = await clone.text();
      if (bodyText.includes("insufficient_quota") || bodyText.includes("quota_exceeded")) {
        console.warn("[LLM] Detected OpenAI insufficient quota (429). Disabling OpenAI requests.");
        isOpenAiQuotaExceeded = true;
      }
    } catch (e) {
      console.error("Error reading OpenAI error body:", e);
    }
  }
}

const normalizeResponseFormat = ({
  responseFormat,
  response_format,
  outputSchema,
  output_schema,
}: {
  responseFormat?: ResponseFormat;
  response_format?: ResponseFormat;
  outputSchema?: OutputSchema;
  output_schema?: OutputSchema;
}):
  | { type: "json_schema"; json_schema: JsonSchema }
  | { type: "text" }
  | { type: "json_object" }
  | undefined => {
  const explicitFormat = responseFormat || response_format;
  if (explicitFormat) {
    if (
      explicitFormat.type === "json_schema" &&
      !explicitFormat.json_schema?.schema
    ) {
      throw new Error(
        "responseFormat json_schema requires a defined schema object"
      );
    }
    return explicitFormat;
  }

  const schema = outputSchema || output_schema;
  if (!schema) return undefined;

  if (!schema.name || !schema.schema) {
    throw new Error("outputSchema requires both name and schema");
  }

  return {
    type: "json_schema",
    json_schema: {
      name: schema.name,
      schema: schema.schema,
      ...(typeof schema.strict === "boolean" ? { strict: schema.strict } : {}),
    },
  };
};

const RETRY_MAX_RETRIES = 4;
const RETRY_BASE_DELAY_MS = 500;
const RETRY_MAX_DELAY_MS = 30_000;

type FetchInit = NonNullable<Parameters<typeof fetch>[1]>;

const sleep = (ms: number) =>
  new Promise<void>(resolve => setTimeout(resolve, ms));

const parseRetryAfter = (value: string | null): number | undefined => {
  if (!value) return undefined;
  const seconds = Number(value);
  if (Number.isFinite(seconds)) return Math.max(0, seconds * 1000);
  const at = Date.parse(value);
  return Number.isNaN(at) ? undefined : Math.max(0, at - Date.now());
};

// Equal-jitter exponential backoff. The cap/2 floor guarantees a minimum
// delay so a misbehaving caller loop slows down instead of hammering the
// upstream while it keeps returning errors.
const computeBackoffDelay = (
  attempt: number,
  retryAfterMs?: number
): number => {
  const cap = Math.min(RETRY_BASE_DELAY_MS * 2 ** attempt, RETRY_MAX_DELAY_MS);
  const jittered = cap / 2 + Math.random() * (cap / 2);
  return Math.min(Math.max(jittered, retryAfterMs ?? 0), RETRY_MAX_DELAY_MS);
};

// Retries non-2xx responses and network errors with exponential backoff, then
// returns the final Response so callers keep their existing error handling.
const fetchWithBackoff = async (
  url: string,
  init: FetchInit
): Promise<Response> => {
  let lastError: unknown;

  for (let attempt = 0; attempt <= RETRY_MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(url, init);
      if (response.ok || attempt === RETRY_MAX_RETRIES) {
        return response;
      }

      const retryAfterMs = parseRetryAfter(
        response.headers.get("retry-after")
      );
      try {
        await response.body?.cancel();
      } catch {
        // Body already settled; nothing to clean up.
      }
      console.warn(
        `LLM request retry ${attempt + 1}/${RETRY_MAX_RETRIES} after status ${response.status}`
      );
      await sleep(computeBackoffDelay(attempt, retryAfterMs));
    } catch (error) {
      lastError = error;
      if (attempt === RETRY_MAX_RETRIES) throw error;
      console.warn(
        `LLM request retry ${attempt + 1}/${RETRY_MAX_RETRIES} after network error`
      );
      await sleep(computeBackoffDelay(attempt));
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("LLM request failed after exhausting retries");
};

export async function invokeLLM(params: InvokeParams): Promise<InvokeResult> {
  let provider = determineProvider();

  try {
    assertApiKey(provider);
  } catch (error: any) {
    if (provider === "gemini" && !process.env.GEMINI_API_KEY && ENV.openAiApiKey && !isOpenAiQuotaExceeded) {
      provider = "openai";
      assertApiKey(provider);
    } else {
      throw error;
    }
  }

  const {
    messages,
    tools,
    toolChoice,
    tool_choice,
    outputSchema,
    output_schema,
    responseFormat,
    response_format,
    model,
    thinking,
    reasoning,
    maxTokens,
    max_tokens,
  } = params;

  const payload: Record<string, unknown> = {
    messages: messages.map(normalizeMessage),
  };

  let apiKey: string;
  let url: string;
  let targetModel: string;

  if (provider === "gemini") {
    apiKey = process.env.GEMINI_API_KEY!;
    url = "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions";
    targetModel = (model && model.startsWith("gemini")) ? model : "gemini-2.5-flash";
  } else {
    apiKey = ENV.openAiApiKey;
    url = `${ENV.openAiBaseUrl}/chat/completions`;
    targetModel = model ?? ENV.openAiModel;
  }

  payload.model = targetModel;

  if (tools && tools.length > 0) {
    payload.tools = tools;
  }

  const normalizedToolChoice = normalizeToolChoice(
    toolChoice || tool_choice,
    tools
  );
  if (normalizedToolChoice) {
    payload.tool_choice = normalizedToolChoice;
  }

  const resolvedMaxTokens = max_tokens ?? maxTokens;
  if (typeof resolvedMaxTokens === "number") {
    payload.max_tokens = resolvedMaxTokens;
  }

  if (thinking) {
    payload.thinking = thinking;
  }
  if (reasoning) {
    payload.reasoning = reasoning;
  }

  const normalizedResponseFormat = normalizeResponseFormat({
    responseFormat,
    response_format,
    outputSchema,
    output_schema,
  });

  if (normalizedResponseFormat) {
    payload.response_format = normalizedResponseFormat;
  }

  try {
    const response = await fetchWithBackoff(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      await checkOpenAiQuotaError(response, provider);

      if (provider === "gemini" && ENV.openAiApiKey && !isOpenAiQuotaExceeded) {
        console.warn(`[LLM] Gemini call failed (${response.status}). Attempting fallback to OpenAI.`);
        isGeminiServiceUnavailable = true;
        return await invokeLLM(params);
      }

      const errorText = await response.text();
      throw new Error(
        `LLM invoke failed (${provider}): ${response.status} ${response.statusText} – ${errorText}`
      );
    }

    return (await response.json()) as InvokeResult;
  } catch (err: any) {
    if (provider === "gemini" && ENV.openAiApiKey && !isOpenAiQuotaExceeded) {
      console.warn("[LLM] Gemini request network error. Attempting fallback to OpenAI:", err);
      isGeminiServiceUnavailable = true;
      return await invokeLLM(params);
    }
    throw err;
  }
}

export type ModelInfo = {
  id: string;
  object: string;
  created: number;
  owned_by: string;
};

export type ModelsResponse = {
  object: string;
  data: ModelInfo[];
};

export async function listLLMModels(): Promise<ModelsResponse> {
  let provider = determineProvider();

  try {
    assertApiKey(provider);
  } catch (error: any) {
    if (provider === "gemini" && !process.env.GEMINI_API_KEY && ENV.openAiApiKey && !isOpenAiQuotaExceeded) {
      provider = "openai";
      assertApiKey(provider);
    } else {
      throw error;
    }
  }

  let apiKey: string;
  let url: string;

  if (provider === "gemini") {
    apiKey = process.env.GEMINI_API_KEY!;
    url = "https://generativelanguage.googleapis.com/v1beta/openai/models";
  } else {
    apiKey = ENV.openAiApiKey;
    url = `${ENV.openAiBaseUrl}/models`;
  }

  try {
    const response = await fetchWithBackoff(url, {
      headers: { authorization: `Bearer ${apiKey}` },
    });

    if (!response.ok) {
      await checkOpenAiQuotaError(response, provider);

      if (provider === "gemini" && ENV.openAiApiKey && !isOpenAiQuotaExceeded) {
        console.warn(`[LLM] Gemini list models failed (${response.status}). Attempting fallback to OpenAI.`);
        isGeminiServiceUnavailable = true;
        return await listLLMModels();
      }

      const errorText = await response.text();
      throw new Error(
        `List LLM models failed (${provider}): ${response.status} ${response.statusText} – ${errorText}`
      );
    }

    return (await response.json()) as ModelsResponse;
  } catch (err: any) {
    if (provider === "gemini" && ENV.openAiApiKey && !isOpenAiQuotaExceeded) {
      console.warn("[LLM] Gemini list models network error. Attempting fallback to OpenAI:", err);
      isGeminiServiceUnavailable = true;
      return await listLLMModels();
    }
    throw err;
  }
}
