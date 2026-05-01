import { streamText, type ModelMessage } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { systemPrompt } from "@/lib/assistant/system-prompt";
import { buildSystemPrompt } from "@/lib/assistant/project-context";
import { checkRateLimit } from "@/lib/assistant/rate-limiter";

// Configuration
const MAX_MESSAGES_CONTEXT = 10;
const MAX_MESSAGE_LENGTH = 500;
const MAX_MESSAGES_PER_REQUEST = 50;
const MAX_TOKENS = 1024;
const TEMPERATURE = 0.7;

// Initialize Google AI Client
function getGoogleClient() {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey) return null;
  return createGoogleGenerativeAI({ apiKey });
}

// Helpers
function getClientIP(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

interface MessageInput {
  role: string;
  content?: string;
  parts?: Array<{ text?: string }>;
}

function validateAndSanitizeMessages(messages: unknown): ModelMessage[] | null {
  if (!Array.isArray(messages)) return null;
  if (messages.length === 0 || messages.length > MAX_MESSAGES_PER_REQUEST) return null;

  const sanitized: ModelMessage[] = [];

  for (const m of messages as MessageInput[]) {
    const role = m.role;
    if (role !== "user" && role !== "assistant") continue;

    let content = m.content || (m.parts ? m.parts.map((p) => p.text || "").join("") : "");

    if (content.length > MAX_MESSAGE_LENGTH) {
      content = content.slice(0, MAX_MESSAGE_LENGTH);
    }

    if (!content.trim()) continue;

    sanitized.push({ role: role as "user" | "assistant", content } as ModelMessage);
  }

  return sanitized.length > 0 ? sanitized : null;
}

// POST Route Handler
export async function POST(req: Request) {
  // 1. Rate limiting
  const clientIP = getClientIP(req);
  const rateLimit = checkRateLimit(clientIP);

  if (rateLimit.limited) {
    return new Response(
      JSON.stringify({
        error: "Too many requests. Please wait a moment before trying again.",
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": String(rateLimit.resetInSeconds),
          "X-RateLimit-Remaining": "0",
        },
      }
    );
  }

  // 2. API key check
  const google = getGoogleClient();
  if (!google) {
    console.error("[AI Assistant] GOOGLE_GENERATIVE_AI_API_KEY is missing.");
    return new Response(JSON.stringify({ error: "AI service is temporarily unavailable." }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // 3. Validate input
    const body = await req.json().catch(() => null);

    if (!body || !body.messages) {
      return new Response(JSON.stringify({ error: "Invalid request body." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const coreMessages = validateAndSanitizeMessages(body.messages);
    if (!coreMessages) {
      return new Response(JSON.stringify({ error: "No valid messages provided." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 4. Manage context window
    const recentMessages = coreMessages.slice(-MAX_MESSAGES_CONTEXT);

    // 5. Build system prompt
    const lastUserMessage = recentMessages.findLast((m) => m.role === "user");
    const lastUserContent =
      typeof lastUserMessage?.content === "string" ? lastUserMessage.content.toLowerCase() : "";

    const finalSystemPrompt = buildSystemPrompt(lastUserContent, systemPrompt);

    // 6. Generate response
    const result = await streamText({
      model: google(process.env.GOOGLE_GENERATIVE_AI_MODEL || "gemini-2.5-flash-lite"),
      system: finalSystemPrompt,
      messages: recentMessages,
      temperature: TEMPERATURE,
      maxOutputTokens: MAX_TOKENS,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("[AI Assistant] Error:", error);
    const message = error instanceof SyntaxError ? "Malformed request body." : "An error occurred.";
    const status = error instanceof SyntaxError ? 400 : 500;

    return new Response(JSON.stringify({ error: message }), {
      status,
      headers: { "Content-Type": "application/json" },
    });
  }
}
