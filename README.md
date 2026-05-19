# Erick Benzo — Interactive Portfolio

> A conversational portfolio. Instead of scrolling through static "About / Experience / Skills" pages, visitors ask natural-language questions and get answers grounded in my actual professional context.

**Live:** [erick.bnzo.io](https://erick.bnzo.io)

---

## Why

Personal sites are mostly read-once and forgotten. The interesting questions a recruiter, collaborator, or curious dev wants to ask: *"have you worked with X stack?"*, *"how did you approach Y problem?"*, *"what's your take on Z?"* usually aren't answered on a static page.

This portfolio is an experiment in replacing low-value page reads with a higher-bandwidth Q&A interface, while keeping a static fallback for crawlers and JS-off visitors.

## Architecture

- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion
- **LLM backend:** Next.js API routes proxying to OpenAI
- **Grounding strategy:** Structured profile data (experience, projects, technical opinions, tone guidelines) injected as system context per request. No fine-tuning, no RAG, the corpus fits comfortably in a system prompt.
- **Rate limiting:** 5 LLM-backed queries per browser session, tracked via `localStorage`. After the limit, the UI falls back to scripted answers with clear messaging.
- **Graceful degradation:** If the LLM request fails or the limit is reached, scripted fallback responses keep the experience usable. Static sections remain readable with JS disabled.

## Design decisions

- **No fine-tuning.** The profile fits cleanly in a system prompt. Fine-tuning would add cost and complexity for no real gain, and grounding stays easy to update as my career evolves.
- **No RAG.** The corpus is small enough that everything relevant goes in context. Embeddings + a vector store would be over-engineering for this scope.
- **Client-side rate limit (localStorage).** Acknowledged limitation: a determined user can clear storage and reset. For a public-demo portfolio, this is intentionally lightweight, the goal is cost control, not auth. A production AI feature would do server-side rate limiting per IP or user.
- **Static fallback is first-class, not an afterthought.** ATS bots, search crawlers, and JS-off visitors get legible content. The chat is an enhancement, not a gate.

## Stack

Next.js · TypeScript · Tailwind CSS · Framer Motion · OpenAI API · Vercel

## Local development

```bash
npm install
echo "OPENAI_API_KEY=your_key" > .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

[erick.bnzo.io](https://erick.bnzo.io) · [LinkedIn](https://www.linkedin.com/in/erickbenzo) · [GitHub](https://github.com/benerick)
