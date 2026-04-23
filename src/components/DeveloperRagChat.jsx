import { useCallback, useEffect, useRef, useState } from 'react'
import { getDeveloperChatUrl } from '../utils/api'

function formatErrorDetail(detail) {
  if (typeof detail === 'string' && detail.trim()) return detail.trim()
  if (Array.isArray(detail)) {
    return detail
      .map((d) => (typeof d === 'object' && d?.msg ? d.msg : JSON.stringify(d)))
      .join(' ')
      .trim()
  }
  if (detail && typeof detail === 'object') {
    const msg = detail.msg ?? detail.message
    if (typeof msg === 'string' && msg.trim()) return msg.trim()
  }
  return ''
}

/** Turn `**markdown bold**` into real bold; leaves other text as plain spans. */
function renderBoldSegments(text) {
  if (text == null || text === '') return null
  const nodes = []
  const re = /\*\*([\s\S]+?)\*\*/g
  let last = 0
  let m
  let key = 0
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) {
      nodes.push(<span key={key++}>{text.slice(last, m.index)}</span>)
    }
    nodes.push(<strong key={key++}>{m[1]}</strong>)
    last = re.lastIndex
  }
  if (last < text.length) {
    nodes.push(<span key={key++}>{text.slice(last)}</span>)
  }
  return nodes
}

/**
 * Compact chat UI for the developer FAB panel (and any other embedded use).
 */
export function DeveloperRagChatPanel({ inputId = 'dev-rag-input', className = '' }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const listEndRef = useRef(null)

  const scrollToBottom = useCallback(() => {
    listEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, loading, scrollToBottom])

  const send = async (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text || loading) return

    setError(null)
    setInput('')
    const userMsg = { role: 'user', content: text }
    setMessages((prev) => [...prev, userMsg])
    setLoading(true)

    try {
      const history = messages.map((m) => ({ role: m.role, content: m.content }))
      const url = getDeveloperChatUrl()
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history })
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        const fromApi = formatErrorDetail(data.detail)
        const base = [fromApi, res.statusText].filter((s) => typeof s === 'string' && s.trim()).join(' — ')
        throw new Error(
          base
            ? `${base} (HTTP ${res.status})`
            : `Request failed (HTTP ${res.status}). Check that nginx proxies /developer-rag to the app and the RAG service is running on port 8765.`
        )
      }
      if (typeof data?.reply !== 'string') {
        throw new Error(
          `Invalid response from assistant (HTTP ${res.status}). The server did not return a text reply.`
        )
      }
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: data.reply
        }
      ])
    } catch (err) {
      const msg = err?.message || ''
      const network =
        err?.name === 'TypeError' && /fetch|network|failed|load/i.test(msg)
      setError(
        network
          ? 'Could not reach the server. Check your connection, or that the site and RAG backend are running.'
          : msg || 'Could not reach the assistant.'
      )
      setMessages((prev) => {
        const last = prev[prev.length - 1]
        if (last?.role === 'user' && last?.content === text) {
          return prev.slice(0, -1)
        }
        return prev
      })
      setInput(text)
    } finally {
      setLoading(false)
    }
  }

  const rootClass = ['dev-rag-fab-chat', className].filter(Boolean).join(' ')

  return (
    <div className={rootClass}>
      <div className="dev-rag-messages dev-rag-messages--fab" role="log" aria-live="polite" aria-relevant="additions">
        {messages.length === 0 ? (
          <p className="dev-rag-empty dev-rag-empty--fab">
            {`Try: "How do I enter EDL mode on QC01W?" or "What is the latest JetPack version for NCOX?"`}
          </p>
        ) : null}
        {messages.map((m, i) => (
          <div key={i} className={`dev-rag-row dev-rag-row--${m.role}`}>
            <div className="dev-rag-bubble dev-rag-bubble--fab">
              <span className="dev-rag-role">{m.role === 'user' ? 'You' : 'Assistant'}</span>
              <div className="dev-rag-text">{renderBoldSegments(m.content)}</div>
            </div>
          </div>
        ))}
        {loading ? (
          <div className="dev-rag-row dev-rag-row--assistant">
            <div className="dev-rag-bubble dev-rag-bubble--typing dev-rag-bubble--fab">
              <span className="dev-rag-role">Assistant</span>
              <span className="dev-rag-dots" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </div>
          </div>
        ) : null}
        <div ref={listEndRef} />
      </div>

      {error ? (
        <p className="dev-rag-error dev-rag-error--fab" role="alert">
          {error}
        </p>
      ) : null}

      <form className="dev-rag-form dev-rag-form--fab" onSubmit={send}>
        <label htmlFor={inputId} className="visually-hidden">
          Your question
        </label>
        <textarea
          id={inputId}
          className="dev-rag-input dev-rag-input--fab"
          rows={2}
          placeholder="Ask about reflashing, EDL, JetPack…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDownCapture={(e) => {
            // Enter sends. Shift+Enter inserts a newline.
            // Use capture so we intercept before the textarea inserts a newline.
            if (e.nativeEvent?.isComposing) return
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              e.stopPropagation()
              // Trigger the same handler as the Send button
              send(e)
            }
          }}
          disabled={loading}
          maxLength={4000}
        />
        <button type="submit" className="dev-rag-send dev-rag-send--fab" disabled={loading || !input.trim()}>
          Send
        </button>
      </form>
    </div>
  )
}
