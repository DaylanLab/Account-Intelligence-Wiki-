import { useState, useRef, useEffect, type FormEvent, type ReactNode, Fragment } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  findScriptedAnswer,
  conciergeFallback,
  suggestedQuestions,
  type ConciergeAnswer,
} from '../data/conciergeAnswers'
import { citations, briefing } from '../data/wiki'

// =============================================================
// Configuration for Live mode (Sprint 2). When this env var is
// set, the toggle is enabled; otherwise it stays disabled and
// shows a "not configured" notice.
// =============================================================
const LIVE_ENDPOINT = import.meta.env.VITE_CONCIERGE_ENDPOINT as string | undefined

type Mode = 'scripted' | 'live'

type Message =
  | { role: 'user'; text: string; ts: string }
  | { role: 'assistant'; mode: Mode; paragraphs: string[]; matchId?: string; relatedIds?: string[]; ts: string }

// ─── citation rendering ────────────────────────────────────

function renderWithCitations(text: string): ReactNode[] {
  // Splits on [N] markers, renders citation as <sup>.
  // Also handles **bold** by splitting on it.
  const parts: ReactNode[] = []
  const re = /\[(\d+)\]|\*\*([^*]+)\*\*/g
  let lastIndex = 0
  let match: RegExpExecArray | null
  let key = 0
  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(<Fragment key={`t-${key++}`}>{text.slice(lastIndex, match.index)}</Fragment>)
    }
    if (match[1]) {
      const n = parseInt(match[1])
      const cit = citations.find((c) => parseInt(c.num) === n)
      parts.push(
        <sup key={`c-${key++}`} className="cite" title={cit?.title ?? `Citation ${n}`}>
          [{n}]
        </sup>
      )
    } else if (match[2]) {
      parts.push(<strong key={`b-${key++}`}>{match[2]}</strong>)
    }
    lastIndex = re.lastIndex
  }
  if (lastIndex < text.length) {
    parts.push(<Fragment key={`t-${key++}`}>{text.slice(lastIndex)}</Fragment>)
  }
  return parts
}

// ─── one message in the thread ─────────────────────────────

function MessageBlock({ msg }: { msg: Message }) {
  const time = msg.ts
  if (msg.role === 'user') {
    return (
      <div className="cc-msg cc-msg-user">
        <div className="cc-msg-byline">
          <span className="cc-msg-who">You</span>
          <span className="cc-msg-when">· {time}</span>
        </div>
        <div className="cc-msg-body">{msg.text}</div>
      </div>
    )
  }
  return (
    <div className="cc-msg cc-msg-assistant">
      <div className="cc-msg-byline">
        <span className="cc-msg-who">Concierge</span>
        <span className="cc-msg-when">· {time}</span>
        <span className={`cc-mode-tag cc-mode-tag-${msg.mode}`}>
          {msg.mode === 'scripted' ? 'Sprint 1 · Scripted' : 'Sprint 2 · Live LLM'}
        </span>
      </div>
      <div className="cc-msg-body">
        {msg.paragraphs.map((p, i) => (
          <p key={i}>{renderWithCitations(p)}</p>
        ))}
      </div>
    </div>
  )
}

// ─── mode toggle ───────────────────────────────────────────

function ModeToggle({ mode, setMode }: { mode: Mode; setMode: (m: Mode) => void }) {
  const liveAvailable = Boolean(LIVE_ENDPOINT)
  return (
    <div className="cc-mode-bar">
      <div className="cc-mode-bar-label">Mode</div>
      <div className="cc-mode-toggle">
        <button
          className={`cc-mode-btn ${mode === 'scripted' ? 'active' : ''}`}
          onClick={() => setMode('scripted')}
        >
          Scripted
        </button>
        <button
          className={`cc-mode-btn ${mode === 'live' ? 'active' : ''} ${liveAvailable ? '' : 'disabled'}`}
          onClick={() => liveAvailable && setMode('live')}
          disabled={!liveAvailable}
          title={liveAvailable ? 'Switch to live Claude API' : 'Live endpoint not configured — see worker/README.md'}
        >
          Live LLM {!liveAvailable && '· not configured'}
        </button>
      </div>
      <div className="cc-mode-bar-note">
        {mode === 'scripted'
          ? 'Curated answers from the Sprint 1 corpus. No hallucination risk; partner-demo safe.'
          : 'Live Claude API with strict guardrails — answers only from the wiki corpus.'}
      </div>
    </div>
  )
}

// ─── page ──────────────────────────────────────────────────

function nowStamp(): string {
  const d = new Date()
  const hh = d.getHours()
  const mm = String(d.getMinutes()).padStart(2, '0')
  const ampm = hh >= 12 ? 'PM' : 'AM'
  const h12 = hh % 12 === 0 ? 12 : hh % 12
  return `${h12}:${mm} ${ampm}`
}

export default function ConciergePage() {
  const [searchParams] = useSearchParams()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [mode, setMode] = useState<Mode>('scripted')
  const [thinking, setThinking] = useState(false)
  const threadRef = useRef<HTMLDivElement>(null)

  // Auto-submit a prefilled query from ?q= once on mount.
  const initialQuery = searchParams.get('q')
  const submittedInitialRef = useRef(false)
  useEffect(() => {
    if (initialQuery && !submittedInitialRef.current) {
      submittedInitialRef.current = true
      void submit(initialQuery)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery])

  // Scroll to bottom on new message.
  useEffect(() => {
    if (threadRef.current) {
      threadRef.current.scrollTop = threadRef.current.scrollHeight
    }
  }, [messages, thinking])

  async function submit(text: string) {
    const trimmed = text.trim()
    if (!trimmed) return
    const userMsg: Message = { role: 'user', text: trimmed, ts: nowStamp() }
    setMessages((m) => [...m, userMsg])
    setInput('')
    setThinking(true)

    // Small delay so the UI feels like it's "thinking" — also gives the
    // user a beat to read their own message before the answer lands.
    await new Promise((r) => setTimeout(r, 450))

    let answer: { paragraphs: string[]; matchId?: string; relatedIds?: string[] }
    if (mode === 'scripted') {
      const hit = findScriptedAnswer(trimmed)
      answer = hit
        ? { paragraphs: hit.paragraphs, matchId: hit.id, relatedIds: hit.related }
        : { paragraphs: conciergeFallback.paragraphs }
    } else {
      // Live mode — call the Cloudflare Worker endpoint.
      try {
        const res = await fetch(LIVE_ENDPOINT!, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: trimmed }),
        })
        if (!res.ok) throw new Error(`Worker returned ${res.status}`)
        const data = await res.json()
        answer = { paragraphs: data.paragraphs ?? [data.answer ?? 'No answer returned.'] }
      } catch (err) {
        answer = {
          paragraphs: [
            `Live endpoint error: ${err instanceof Error ? err.message : 'unknown'}.`,
            `Falling back to Scripted mode — toggle above and resend.`,
          ],
        }
      }
    }

    const reply: Message = {
      role: 'assistant',
      mode,
      paragraphs: answer.paragraphs,
      matchId: answer.matchId,
      relatedIds: answer.relatedIds,
      ts: nowStamp(),
    }
    setMessages((m) => [...m, reply])
    setThinking(false)
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    void submit(input)
  }

  function suggestionClick(s: string) {
    void submit(s)
  }

  function relatedClick(id: string) {
    const entry = ([] as ConciergeAnswer[])
      .concat(...messages.map(() => []))
      .find((c) => c.id === id)
    // Use the canonical question text for the related lookup
    const q = findRelatedQuestion(id)
    if (q) void submit(q)
    else void entry // unused, placeholder
  }

  const showSuggestions = messages.length === 0

  // Related-question chips from the last assistant message
  const lastAssistant = [...messages].reverse().find((m) => m.role === 'assistant') as
    | (Extract<Message, { role: 'assistant' }> & { relatedIds?: string[] })
    | undefined
  const relatedChips = lastAssistant?.relatedIds
    ?.map((id) => findRelatedQuestion(id))
    .filter(Boolean) as string[] | undefined

  return (
    <>
      <section className="dateline">
        <div className="dateline-left">
          <div className="dateline-eyebrow">
            <em>Account Concierge</em>
            <span className="sep">·</span>
            {briefing.account}
            <span className="sep">·</span>
            {briefing.edition}
            <span className="sep">·</span>
            Ask anything
          </div>
          <h1 className="dateline-title">Ask the {briefing.account} wiki</h1>
          <p className="dateline-strap">
            Surface #1 from AGENTS.md §10a. Answers cite back to wiki/ pages. Sprint 1 ships a curated corpus; Sprint 2 wires a live Claude API.
          </p>
        </div>
      </section>

      <main className="cc-concierge">
        <ModeToggle mode={mode} setMode={setMode} />

        <div className="cc-thread" ref={threadRef}>
          {showSuggestions && (
            <div className="cc-welcome">
              <div className="cc-welcome-eyebrow">Ready when you are.</div>
              <p className="cc-welcome-body">
                I know what's in wiki/ as of the May 24 sweep — the CVS overview, four
                shortlisted opportunities, two synthesis pages, two intelligence pages.
                Ask anything below or pick a suggestion.
              </p>
            </div>
          )}

          {messages.map((m, i) => (
            <MessageBlock key={i} msg={m} />
          ))}

          {thinking && (
            <div className="cc-msg cc-msg-assistant cc-msg-thinking">
              <div className="cc-msg-byline">
                <span className="cc-msg-who">Concierge</span>
                <span className="cc-msg-when">· consulting the wiki</span>
              </div>
              <div className="cc-msg-body">
                <p className="cc-thinking-dots"><span /><span /><span /></p>
              </div>
            </div>
          )}

          {!thinking && relatedChips && relatedChips.length > 0 && (
            <div className="cc-related">
              <div className="cc-related-label">Follow up</div>
              <div className="cc-related-chips">
                {relatedChips.map((q) => (
                  <button key={q} className="cc-related-chip" onClick={() => void submit(q)}>
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <form className="cc-input-row" onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask the CVS wiki…"
            autoFocus
          />
          <button type="submit" disabled={!input.trim() || thinking}>
            Ask →
          </button>
        </form>

        {showSuggestions && (
          <div className="cc-suggestions-block">
            <div className="cc-suggestions-label">Try one of these</div>
            <div className="cc-suggestions-list">
              {suggestedQuestions.map((s) => (
                <button key={s} className="cc-suggestion-btn" onClick={() => suggestionClick(s)}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  )
}

// ── helper: get the canonical question text for an answer id ──
import { conciergeAnswers } from '../data/conciergeAnswers'
function findRelatedQuestion(id: string): string | undefined {
  return conciergeAnswers.find((a) => a.id === id)?.question
}
