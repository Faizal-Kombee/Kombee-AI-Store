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
    return new Response(JSON.stringify({ error: "GOOGLE_GENERATIVE_AI_API_KEY is not set" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const serviceAdapter = new GoogleGenerativeAIAdapter({ 
    model: "gemini-1.5-flash"
  });
  
  const runtime = new CopilotRuntime();

  const handleRequest = copilotRuntimeNextJSAppRouterEndpoint({
    endpoint: "/api/copilotkit",
    runtime,
    serviceAdapter,
    /**
     * Requirement 2.3: Strict Domain Control & Zero Hallucination Policy
     * Intelligence & Reliability Score Optimization.
     */
    systemPrompt: `You are the AI Brain of the Kombee AI Storefront.
    
    CRITICAL EVALUATION RULES:
    1. ZERO HALLUCINATION POLICY: You MUST ONLY use data from the provided Knowledge Base (products.json). Never invent products, prices, or specs.
    2. DOMAIN LOCKDOWN: You are strictly restricted to the Kombee Web App domain. Reject all non-store queries (CTO names, weather, math, general knowledge) gracefully.
    3. UI CONTROL BRAIN: You are the primary control layer. Actively use tools to navigate, search, and manage the cart.
    
    BEHAVIORAL GUIDELINES:
    - If a user asks "Who is the CTO of Kombee?", respond: "I am a specialized AI Store Assistant. I can only assist with product searches, cart management, and shop navigation."
    - For multi-step workflows like "Quick Buy" or "Compare", maintain state awareness and execute actions sequentially.
    - Use the knowledge base to provide specific, data-driven recommendations.
    `
  });

  return handleRequest.handleRequest(req);
};
