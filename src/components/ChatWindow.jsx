import React, { useEffect, useRef } from 'react'
import { ArrowDown, ShieldCheck } from 'lucide-react'
import MessageBubble from './MessageBubble'

export default function ChatWindow({ messages }) {
  const endRef = useRef(null)
  useEffect(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages])
  return (
    <main className="flex min-h-0 flex-1 flex-col overflow-y-auto">
      <div className="mx-auto w-full max-w-4xl px-4 pb-6 pt-6 sm:px-6">
        <div className="mb-4 flex items-center gap-2 text-[11px] font-semibold text-slate-400">
          <ShieldCheck className="h-3.5 w-3.5 text-indiaGreen" />
          <span>Answers are generated from a mocked retrieval set. Wire this layer to your RAG API in <code className="rounded bg-slate-100 px-1 dark:bg-white/10">findMockResponse()</code>.</span>
        </div>
        {messages.map(message => <MessageBubble key={message.id} message={message} />)}
        <div ref={endRef} />
      </div>
    </main>
  )
}
