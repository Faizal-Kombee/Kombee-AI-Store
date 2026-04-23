# Kombee "Command the UI" AI Chatbot

Project show AI-first UI controlled by **CopilotKit**. AI assistant "owns" UI. Search, filter, manage cart. Multi-step "Quick Buy" workflows via natural language or voice.

## Features
- 🚀 **UI Control Layer**: AI push routes, filter products, manage state.
- 📦 **Open-Source CopilotKit**: Local runtime integration. Zero cloud deps.
- 🛡️ **Zero Hallucination Guardrails**: Restricted knowledge base for product specs + FAQs.
- 🔄 **Multi-step Workflows**: Actions like "Find cheapest blue sunglasses and checkout".
- 🎙️ **Voice Control**: Web Speech API for hands-free UI.
- 🐳 **Docker Ready**: Setup via Docker Compose.

## Getting Started

### Prerequisites
- Node.js 18+
- OpenAI API Key or local Ollama endpoint

### Local Development
1. Clone repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set environment variables in `.env.local`:
   ```bash
   OPENAI_API_KEY=your_key_here
   ```
4. Run dev server:
   ```bash
   npm run dev
   ```

### Docker Setup
1. Build + run:
   ```bash
   docker-compose up --build
   ```

## Sample Prompts to Try
- "Show me all blue sunglasses."
- "What is the cheapest item in the store?"
- "Add the Midnight Aviators to my cart."
- "Quick Buy: Find the cheapest blue item and take me to checkout."
- "Who is the CEO of Google?" *(Observe guardrail refusal)*

## Technical Details
- **Next.js 14 (App Router)**
- **CopilotKit** for AI actions + state awareness.
- **Tailwind CSS** + **Framer Motion** for premium aesthetic.
- **Lucide React** for iconography.
