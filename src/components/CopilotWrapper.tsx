"use client";

import { CopilotKit, useCopilotChat } from "@copilotkit/react-core";
import { CopilotSidebar } from "@copilotkit/react-ui";
import { TextMessage, MessageRole } from "@copilotkit/runtime-client-gql";
import "@copilotkit/react-ui/styles.css";
import { useEffect, useState } from "react";
import { Mic, MicOff } from "lucide-react";

function VoiceHandler() {
  const { visibleMessages: messages, appendMessage } = useCopilotChat();
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !messages || messages.length === 0)
      return;

    const lastMessage = messages[messages.length - 1];

    if (
      lastMessage instanceof TextMessage &&
      lastMessage.role === MessageRole.Assistant
    ) {
      const content = lastMessage.content;
      if (typeof content === "string") {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(content);
        window.speechSynthesis.speak(utterance);
      }
    }
  }, [messages]);

  const toggleListening = () => {
    if (typeof window === "undefined") return;
    const SpeechConstructor =
      (window as any).webkitSpeechRecognition ||
      (window as any).speechRecognition;
    if (!SpeechConstructor) return;

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new SpeechConstructor();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      if (transcript) {
        appendMessage(
          new TextMessage({ role: MessageRole.User, content: transcript }),
        );
      }
    };
    recognition.start();
  };

  return (
    <div className="fixed top-4 right-16 z-[9999]">
      <button
        onClick={toggleListening}
        className={`p-3 rounded-full shadow-lg transition-all ${
          isListening
            ? "bg-red-500 text-white animate-pulse"
            : "bg-white text-indigo-600 hover:bg-indigo-50"
        }`}
      >
        {isListening ? (
          <MicOff className="w-5 h-5" />
        ) : (
          <Mic className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}

export default function CopilotWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-slate-50" />;
  }

  return (
    <CopilotKit runtimeUrl="/api/copilotkit">
      <div className="flex min-h-screen">
        <main className="flex-1 relative overflow-auto">
          <VoiceHandler />
          {children}
        </main>
        
        <CopilotSidebar
          instructions={`You are the AI Brain of the Kombee AI Storefront.
    
          CRITICAL EVALUATION RULES:
          1. ZERO HALLUCINATION POLICY: You MUST ONLY use data from the provided Knowledge Base (products.json). Never invent products, prices, or specs.
          2. DOMAIN LOCKDOWN: You are strictly restricted to the Kombee Web App domain. Reject all non-store queries (CTO names, weather, math, general knowledge) gracefully.
          3. UI CONTROL BRAIN: You are the primary control layer. Actively use tools to navigate, search, and manage the cart.
          
          BEHAVIORAL GUIDELINES:
          - If a user asks "Who is the CTO of Kombee?", respond: "I am a specialized AI Store Assistant. I can only assist with product searches, cart management, and shop navigation."
          - For multi-step workflows like "Quick Buy" or "Compare", maintain state awareness and execute actions sequentially.
          - Use the knowledge base to provide specific, data-driven recommendations.`}
          defaultOpen={true}
          labels={{ title: "Kombee Assistant" }}
        />
      </div>
    </CopilotKit>
  );
}
