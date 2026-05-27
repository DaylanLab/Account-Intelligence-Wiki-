/**
 * Concierge — Cloudflare Worker (Sprint 2 wiring)
 *
 * This Worker is the "Live LLM" backend for the Concierge chat. The React
 * app at https://daylanlab.github.io/Account-Intelligence-Wiki-/ calls
 * this endpoint when the user toggles to Live mode.
 *
 * Guardrails are intentional and aggressive:
 *   - The system prompt restricts the model to the wiki content embedded
 *     in this file. No retrieval, no external knowledge.
 *   - The model is instructed to say "I don't know" rather than guess.
 *   - Every assertion must include a citation marker.
 *
 * Deploy:
 *   1. wrangler login
 *   2. wrangler secret put ANTHROPIC_API_KEY   (paste your key)
 *   3. wrangler deploy
 *   4. Set VITE_CONCIERGE_ENDPOINT in the React app's GitHub Actions
 *      secrets to the deployed worker URL.
 *
 * Local dev: wrangler dev --local
 */

// ─── Wiki content embedded at deploy time ─────────────────────
// In a more mature build this would be fetched fresh, but for the
// current corpus size (<10k tokens) we just inline it. Update this
// constant whenever the wiki/ markdown materially changes.

const WIKI_CONTENT = `
[CVS Wiki content — Sprint 1 corpus]

OVERVIEW (wiki/overview.md):
CVS Health is consolidating under CEO David Joyner (since October 2024) around three pillars: integrated pharmacy-benefit management, value-based primary care, and AI-enabled cost reduction inside Aetna. Q1 FY2026 print beat consensus on Health Services revenue but missed on Aetna MLR. PwC's position inside the Enterprise Digital Transformation Office (EDTO) is durable but no longer exclusive — McKinsey on Aetna AI roadmap, Bain on Oak Street integration. Cowhey CFO advisory reaffirmed through FY2027.

PRIORITIES (wiki/priorities/):
1. Integrated PBM + primary care — Pharmacy + Caremark + Aetna data unification.
2. Operational efficiency via genAI — Aetna claims processing; target $2B savings/24mo per public guidance; internal roadmap slipped 9 months.
3. Retail rationalization — Northeast lease negotiations quietly halted Nov 2025.

OPPORTUNITIES (wiki/opportunities/):
01 Total Patient Experience Data Architecture — $45M Qualified. Contact: Mandadi. Lead PwC opportunity.
02 Digital-First Patient Portal 2.0 — $12.5M Developing. Replatform.
03 Zero Trust Architecture Pilot — $8.2M Identified. NO PRIMARY CONTACT (open issue — needs CISO identification).
04 Retail Rationalization Program — $20M (est.) Forming. Pre-Q2 window (Aug 6 earnings).

CONTACTS (wiki/contacts/):
David Joyner — CEO. Champion of integrated-care narrative. Access via Marshall (PwC partner). Risk: October 2025 board statement on 15% NE expansion contradicted by November Slack from VP Retail Ops halting all lease negotiations.
Tom Cowhey — CFO. CFO advisory through FY2027. Long-running PwC relationship. Measured tone on Q1 MLR miss.
Prem Shah — Group President, Pharmacy & Consumer Wellness. Owns retail rationalization decision.
Tilak Mandadi — EVP Ventures, Technology & Data. Economic buyer for EDTO. Primary contact on $45M opportunity.

CONTRADICTIONS (wiki/synthesis/unresolved-contradictions.md):
1. Retail footprint — public: 15% NE expansion (Joyner, board Oct 15 2025). Internal: lease negotiations halted (Slack, VP Retail Ops, Nov 20 2025). PwC implication: don't lean on expansion line; retail-rationalization opportunity larger than originally scoped.
2. SEC cyber disclosure rule fate — SEC enforced against 4 companies Oct 2024 for materially misleading cyber disclosures; 24+ Item 1.05 filings since. But ABA, BPI, ICBA, SIFMA, IIB petitioned May 22 2025 to rescind 4-day rule. PwC implication: methodology durable; lean on board confidence not Item 1.05 specifics.

INTELLIGENCE (wiki/intelligence/):
2025-05-22 — Banking trade associations petition SEC to rescind Item 1.05 4-day cyber disclosure requirement (real public event).
2025-11-15 — EU designates 19 ICT providers (AWS, Azure, GCP, others) as DORA Critical Third-Party Providers under direct supervisory oversight (real public event). DORA itself entered application Jan 17 2025.
2026-05-08 — CVS Q1 FY2026 earnings: Health Services beat, Aetna MLR miss.

CITATIONS:
[1] CVS Health Q4 FY2025 earnings posture (illustrative internal synthesis)
[2] Top Cybersecurity Consulting Firms 2026 — Casebasix (real public industry analysis)
[3] EIOPA — Digital Operational Resilience Act (real, official)
[4] Hunton Andrews Kurth — SEC Cybersecurity Reporting Update (real)
[5] DLA Piper Market Edge — Future of SEC Cyber Disclosure Rules June 2025 (real)
[6] Greenberg Traurig — SEC Cybersecurity Disclosure Trends 2025 (real)
[7] PwC — SEC's Cyber Disclosure Rule POV (real)
`.trim()

const SYSTEM_PROMPT = `You are the CVS Account Concierge for the PwC account team. You answer questions ONLY using the WIKI CONTENT provided below.

CRITICAL RULES:
- If the answer is not in the WIKI CONTENT, respond exactly: "I don't have that in the current wiki corpus. To add: drop a source into raw/ and trigger an ingest pass (see AGENTS.md §4a)."
- Never invent facts, dates, names, quotes, numbers, or relationships not present in the WIKI CONTENT.
- Never speculate. Never extrapolate. Never reason beyond what is written.
- Cite every assertion using [N] markers that map to the CITATIONS list in the WIKI CONTENT.
- Keep answers under 200 words.
- Use **bold** sparingly for emphasis on names or key terms.
- Use a professional, editorial tone — this is for PwC partners.

WIKI CONTENT:
${WIKI_CONTENT}`

// ─── Worker handler ───────────────────────────────────────────

export default {
  async fetch(request, env) {
    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(),
      })
    }

    if (request.method !== 'POST') {
      return jsonResponse({ error: 'POST only' }, 405)
    }

    let body
    try {
      body = await request.json()
    } catch {
      return jsonResponse({ error: 'Invalid JSON' }, 400)
    }

    const userMessage = (body.message || '').toString().trim()
    if (!userMessage) {
      return jsonResponse({ error: 'Empty message' }, 400)
    }
    if (userMessage.length > 2000) {
      return jsonResponse({ error: 'Message too long (max 2000 chars)' }, 400)
    }

    if (!env.ANTHROPIC_API_KEY) {
      return jsonResponse(
        { error: 'ANTHROPIC_API_KEY not configured. Run: wrangler secret put ANTHROPIC_API_KEY' },
        500
      )
    }

    try {
      const claude = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-5-20250929',
          max_tokens: 600,
          system: [
            {
              type: 'text',
              text: SYSTEM_PROMPT,
              cache_control: { type: 'ephemeral' }, // prompt caching — corpus is large + reused
            },
          ],
          messages: [{ role: 'user', content: userMessage }],
        }),
      })

      if (!claude.ok) {
        const errText = await claude.text()
        return jsonResponse(
          { error: `Claude API error ${claude.status}: ${errText.slice(0, 200)}` },
          502
        )
      }

      const data = await claude.json()
      const text = data.content?.[0]?.text ?? 'No response from model.'
      // Split into paragraphs for clean rendering in the chat UI
      const paragraphs = text.split(/\n\n+/).map((p) => p.trim()).filter(Boolean)
      return jsonResponse({ paragraphs, raw: text })
    } catch (err) {
      return jsonResponse({ error: `Worker error: ${err.message}` }, 500)
    }
  },
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
}

function jsonResponse(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders() },
  })
}
