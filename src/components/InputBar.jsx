import React, { useEffect, useRef, useState } from 'react'
import { ArrowUp, Paperclip, SlidersHorizontal } from 'lucide-react'

export default function InputBar({ onSend, disabled, domain }) {
  const [value, setValue] = useState('')
  const ref = useRef(null)

  useEffect(() => {
    // Don't auto-focus on touch devices: it pops the keyboard open on load
    if (window.matchMedia('(pointer: fine)').matches) ref.current?.focus()
  }, [domain])

  const submit = () => {
    const q = value.trim()
    if (!q || disabled) return
    onSend(q)
    setValue('')
  }

  return (
    <div className="border-t border-slate-200/80 bg-white/85 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80 sm:p-4">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-3xl border border-slate-200 bg-white shadow-soft transition focus-within:border-sky-300 focus-within:ring-4 focus-within:ring-sky-500/10 dark:border-white/10 dark:bg-slate-900/90 dark:focus-within:border-sky-500/40 dark:focus-within:ring-sky-500/5">
          <div className="flex items-end gap-2 p-2.5">
            <button className="focus-ring mb-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-2xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-white/5 dark:hover:text-slate-200" aria-label="Attach document (demo)">
              <Paperclip className="h-4 w-4" />
            </button>
            <textarea
              ref={ref}
              value={value}
              disabled={disabled}
              onChange={e => setValue(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit() } }}
              rows={1}
              placeholder={`Ask about ${domain.toLowerCase()}…`}
              className="max-h-32 min-h-10 flex-1 resize-none bg-transparent px-1 py-2 text-base leading-6 sm:text-sm text-ink-900 outline-none placeholder:text-slate-400 dark:text-white"
              aria-label="Ask Sarkari Sahayak"
            />
            <button className="focus-ring mb-0.5 hidden h-10 items-center gap-1.5 rounded-2xl px-3 text-xs font-semibold text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-white/5 dark:hover:text-slate-200 sm:flex" aria-label="Response settings (demo)">
              <SlidersHorizontal className="h-4 w-4" /> <span>Grounded</span>
            </button>
            <button disabled={!value.trim() || disabled} onClick={submit} className="focus-ring mb-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-ink-900 text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-ink-800 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-sky-700 dark:hover:bg-sky-600" aria-label="Send message">
              <ArrowUp className="h-4 w-4" strokeWidth={2.4} />
            </button>
          </div>
          <div className="flex items-center justify-between px-4 pb-2 text-[10px] text-slate-400">
            <span className="hidden sm:inline">Enter to send · Shift + Enter for a new line</span>
            <span className="hidden sm:block">Demo RAG · official-source-first</span>
          </div>
        </div>
      </div>
    </div>
  )
}
