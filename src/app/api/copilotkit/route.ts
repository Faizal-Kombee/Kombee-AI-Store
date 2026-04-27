import {
  CopilotRuntime,
  GoogleGenerativeAIAdapter,
  copilotRuntimeNextJSAppRouterEndpoint,
} from "@copilotkit/runtime";
import { NextRequest } from "next/server";

/**
 * Requirement 2.1: CopilotKit Integration (Open Source Only)
 * Implementation using local @copilotkit/runtime with Google Generative AI Adapter.
 */

export const POST = async (req: NextRequest) => {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "GOOGLE_GENERATIVE_AI_API_KEY is not set" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const serviceAdapter = new GoogleGenerativeAIAdapter({
    model: "gemini-1.5-flash",
  });

  const runtime = new CopilotRuntime();

  const handleRequest = copilotRuntimeNextJSAppRouterEndpoint({
    endpoint: "/api/copilotkit",
    runtime,
    serviceAdapter,
  });

  return handleRequest.handleRequest(req);
};
