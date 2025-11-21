import React, { useEffect, useRef, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

const ChatWidget = () => {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const wsRef = useRef(null)
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  useEffect(() => {
    if (!open) return
    const wsUrl = API.replace('http', 'ws') + '/ws/chat'
    const ws = new WebSocket(wsUrl)
    wsRef.current = ws
    ws.onmessage = (ev) => {
      try { setMessages(prev => [...prev, JSON.parse(ev.data)]) } catch {}
    }
    ws.onclose = () => {}
    return () => ws.close()
  }, [open])

  const send = () => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return
    const payload = { room: 'global', user: user?.username || 'anon', text }
    wsRef.current.send(JSON.stringify(payload))
    setText('')
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!open && (
        <button onClick={() => setOpen(true)} className="px-4 py-2 rounded-xl bg-amber-500/30 border border-amber-400/40 text-amber-100 shadow-[0_0_20px_rgba(234,179,8,0.3)]">Open Chat</button>
      )}
      {open && (
        <div className="w-80 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 border-b border-white/10">
            <p className="text-blue-100 text-sm">Live Chat</p>
            <button onClick={() => setOpen(false)} className="text-blue-100/70 hover:text-blue-100">✕</button>
          </div>
          <div className="h-64 overflow-y-auto p-3 space-y-2">
            {messages.map((m, i) => (
              <div key={i} className="text-sm text-blue-100/90"><span className="text-amber-200">{m.user}:</span> {m.text}</div>
            ))}
          </div>
          <div className="flex gap-2 p-2 border-t border-white/10">
            <input value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=> e.key==='Enter' && send()} placeholder="Type a message" className="flex-1 rounded-lg bg-black/40 border border-white/10 text-blue-50 px-2 py-1" />
            <button onClick={send} className="px-3 py-1 rounded-lg bg-blue-600/30 border border-blue-400/40 text-blue-100">Send</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatWidget
