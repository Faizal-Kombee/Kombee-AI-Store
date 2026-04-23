import {
  CopilotRuntime,
  GoogleGenerativeAIAdapter,
  copilotRuntimeNextJSAppRouterEndpoint,
} from "@copilotkit/runtime";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "GOOGLE_GENERATIVE_AI_API_KEY is not set" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  // GoogleGenerativeAIAdapter expects the model name string. 
  // It will use process.env.GOOGLE_GENERATIVE_AI_API_KEY by default or we can pass it.
  const serviceAdapter = new GoogleGenerativeAIAdapter({ 
    model: "gemini-1.5-flash"
  });
  
  const runtime = new CopilotRuntime();

  const handleRequest = copilotRuntimeNextJSAppRouterEndpoint({
    endpoint: "/api/copilotkit",
    runtime,
    serviceAdapter,
  });

  // copilotRuntimeNextJSAppRouterEndpoint returns an object with handleRequest method
  return handleRequest.handleRequest(req);
};
