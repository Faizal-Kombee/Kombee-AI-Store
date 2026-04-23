# Kombee "Command the UI" AI Chatbot

This project demonstrates an AI-first UI controlled by **CopilotKit**. The AI assistant "owns" the UI, allowing users to search, filter, manage their cart, and even perform complex multi-step workflows like "Quick Buy" using natural language or voice.

## Features
- 🚀 **UI Control Layer**: AI can push routes, filter products, and manage state.
- 📦 **Open-Source CopilotKit**: Local runtime integration with zero cloud dependencies.
- 🛡️ **Zero Hallucination Guardrails**: Restricted knowledge base for product specs and FAQs.
- 🔄 **Multi-step Workflows**: Orchestrated actions like "Find cheapest blue sunglasses and checkout".
- 🎙️ **Voice Control**: Integrated Web Speech API for hands-free UI interaction.
- 🐳 **Docker Ready**: One-command setup with Docker Compose.

## Getting Started

### Prerequisites
- Node.js 18+
- OpenAI API Key (or a local Ollama endpoint)

### Local Development
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set your environment variables in `.env.local`:
   ```bash
   OPENAI_API_KEY=your_key_here
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

### Docker Setup
1. Build and run with Docker Compose:
   ```bash
   docker-compose up --build
   ```

## Sample Prompts to Try
- "Show me all blue sunglasses."
- "What is the cheapest item in the store?"
- "Add the Midnight Aviators to my cart."
- "Quick Buy: Find the cheapest blue item and take me to checkout."
- "Who is the CEO of Google?" *(Observe the guardrail refusal)*

## Technical Details
- **Next.js 14 (App Router)**
- **CopilotKit** for AI actions and state awareness.
- **Tailwind CSS** + **Framer Motion** for a premium aesthetic.
- **Lucide React** for iconography.
