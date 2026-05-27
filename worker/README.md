# Concierge Live LLM — Cloudflare Worker

This directory holds the Sprint 2 backend for the Concierge chat. When deployed, it lets the React app at `/concierge` toggle into **Live LLM mode** and get real Claude-API responses against the wiki corpus.

Until this Worker is deployed, the Live toggle in the UI shows *"not configured"* and the Concierge stays in **Scripted mode** (using the curated Q&A in `app/src/data/conciergeAnswers.ts`).

## What this Worker does

A small POST endpoint that:

1. Accepts `{ message: string }` from the React app
2. Calls the Anthropic Claude API with:
   - A system prompt that **embeds the full wiki corpus** inline
   - **Aggressive guardrails** — answers only from the wiki, says "I don't know" otherwise, cites with `[N]` markers
   - **Prompt caching** on the wiki content (huge cost saving on repeat calls)
3. Returns `{ paragraphs: string[] }` for the chat UI to render

API key never touches the browser. Lives in Cloudflare's secret store.

## One-time deploy

```bash
# 1. Install Wrangler (Cloudflare's CLI) if not already
npm install -g wrangler

# 2. Log in to Cloudflare
wrangler login

# 3. From this directory, set the Anthropic API key as a secret
cd worker
wrangler secret put ANTHROPIC_API_KEY
# (paste your sk-ant-... key when prompted)

# 4. Deploy
wrangler deploy
```

Wrangler will print the deployed URL — something like `https://cvs-concierge-worker.<your-subdomain>.workers.dev`.

## Wire the React app

Set the deployed URL as a build-time environment variable. In the GitHub Actions workflow (`.github/workflows/deploy.yml`), add to the build step:

```yaml
env:
  VITE_CONCIERGE_ENDPOINT: ${{ secrets.VITE_CONCIERGE_ENDPOINT }}
```

And in the repo's GitHub Actions secrets, add `VITE_CONCIERGE_ENDPOINT` = the workers.dev URL.

Push to main; the next deploy will have the Live toggle enabled.

## Updating the wiki corpus inside the Worker

When you make material changes to `wiki/`, update the `WIKI_CONTENT` constant in `concierge-worker.js` and redeploy. (A more mature setup would fetch the corpus from GitHub at request time and cache it — that's a Sprint 3 improvement.)

## Cost notes

- **Prompt caching is on.** First request: full corpus tokens billed. Subsequent requests within 5 minutes: 10% of input cost. A demo session of ~20 questions costs well under $1.
- **Model is Claude Sonnet 4.5** — change in `concierge-worker.js` if you want a cheaper tier (Haiku) for routine work.
- **Rate limits**: Cloudflare Workers free tier allows 100k requests/day. More than enough.

## Local development

```bash
cd worker
wrangler dev --local
```

Then in `app/.env.local`:

```
VITE_CONCIERGE_ENDPOINT=http://localhost:8787
```

Restart the Vite dev server. Toggle to Live in the Concierge UI. Should work end-to-end against your local Worker hitting the real Claude API.
