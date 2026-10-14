import React, { useMemo, useState } from 'react'
import { Bot, Copy, Check, FileCheck2, Sparkles, UserRound } from 'lucide-react'
import SourceCitation from './SourceCitation'

const confidenceStyles = {
  High: 'bg-emerald-50 text-emerald-700 ring-emerald-100 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-500/20',
  Medium: 'bg-amber-50 text-amber-700 ring-amber-100 dark:bg-amber-400/10 dark:text-amber-300 dark:ring-amber-500/20',
  Low: 'bg-rose-50 text-rose-700 ring-rose-100 dark:bg-rose-400/10 dark:text-rose-300 dark:ring-rose-500/20'
}

export default function MessageBubble({ message }) {
  const [eli5, setEli5] = useState(false)
  const [copied, setCopied] = useState(false)
  const isUser = message.role === 'user'

  const copyAnswer = async () => {
    if (!message.answer) return
    await navigator.clipboard?.writeText(message.answer)
    setCopied(true)
    setTimeout(() => setCopied(false), 1400)
  }

  const confidenceLabel = useMemo(() => message.confidence || 'High', [message.confidence])

  if (message.loading) {
    return (
      <div className="animate-fade-up py-3">
        <div className="flex max-w-3xl gap-3">
          <div className="hidden h-9 w-9 shrink-0 place-items-center rounded-2xl bg-ink-900 text-white shadow-sm dark:bg-sky-950 sm:grid"><Bot className="h-4 w-4" /></div>
          <div className="w-full rounded-3xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-slate-900/70">
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400"><span className="h-2 w-2 animate-pulse-soft rounded-full bg-sky-500" /> Retrieving official sources and drafting a grounded answer…</div>
            <div className="space-y-2.5">
              <div className="h-3 w-[82%] animate-pulse rounded bg-slate-100 dark:bg-white/10" />
              <div className="h-3 w-full animate-pulse rounded bg-slate-100 dark:bg-white/10" />
              <div className="h-3 w-[65%] animate-pulse rounded bg-slate-100 dark:bg-white/10" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-fade-up py-3">
      <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
        {!isUser && <div className="hidden h-9 w-9 shrink-0 place-items-center rounded-2xl sm:grid bg-ink-900 text-white shadow-sm dark:bg-sky-950"><Bot className="h-4 w-4" /></div>}
        <div className={`${isUser ? 'max-w-[86%] rounded-3xl rounded-br-lg bg-ink-900 px-4 py-3 text-white dark:bg-sky-900/90' : 'w-full max-w-3xl'}`}>
          {isUser ? (
            <p className="text-sm leading-6">{message.content}</p>
          ) : (
            <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-panel sm:p-5 dark:border-white/10 dark:bg-slate-900/70">
              {message.noAnswer ? (
                <div className="rounded-2xl border border-dashed border-rose-200 bg-rose-50/70 p-4 dark:border-rose-500/20 dark:bg-rose-400/5">
                  <div className="mb-1 flex items-center gap-2 font-semibold text-rose-800 dark:text-rose-200"><span className="h-2.5 w-2.5 rounded-full bg-rose-400" /> I couldn’t find a reliable answer for this in my documents.</div>
                  <p className="text-xs leading-5 text-rose-700/80 dark:text-rose-200/70">Try rephrasing with a specific law, department, section, state, or document name. This demo intentionally avoids making up unsupported answers.</p>
                </div>
              ) : (
                <>
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ring-1 ${confidenceStyles[confidenceLabel]}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${confidenceLabel === 'High' ? 'bg-emerald-500' : confidenceLabel === 'Medium' ? 'bg-amber-500' : 'bg-rose-500'}`} />
                      {confidenceLabel} confidence
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-2.5 py-1 text-[10px] font-semibold text-slate-500 ring-1 ring-slate-100 dark:bg-white/5 dark:text-slate-400 dark:ring-white/10">
                      <FileCheck2 className="h-3 w-3" /> {message.retrieved} sources retrieved
                    </span>
                    <div className="ml-auto hidden items-center gap-1 rounded-full bg-slate-100/80 sm:flex px-2 py-1 dark:bg-white/5">
                      <span className="text-[9px] font-bold uppercase tracking-[0.08em] text-slate-400">Grounding</span>
                      <span className="flex h-1.5 w-16 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                        {[0, 1, 2, 3, 4].map(i => <span key={i} className={`h-full flex-1 ${i < Math.min(5, message.retrieved + (confidenceLabel === 'High' ? 1 : 0)) ? 'bg-sky-500' : 'bg-transparent'}`} />)}
                      </span>
                    </div>
                  </div>
                  <p className="text-[15px] leading-7 break-words text-slate-700 dark:text-slate-200">{eli5 ? message.eli5 : message.answer}</p>
                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    <button className={`focus-ring inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-2 text-[11px] font-semibold transition ${eli5 ? 'border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-400/20 dark:bg-sky-400/10 dark:text-sky-300' : 'border-slate-200 text-slate-500 hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5'}`} onClick={() => setEli5(!eli5)}>
                      <Sparkles className="h-3.5 w-3.5" /> Explain like I’m 5
                    </button>
                    <button className="focus-ring inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-2.5 py-2 text-[11px] font-semibold text-slate-500 transition hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5" onClick={copyAnswer}>
                      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}{copied ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <div className="mt-5 border-t border-slate-100 pt-4 dark:border-white/10">
                    <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">Sources</div>
                    <div className="flex flex-wrap gap-2">
                      {message.sources.map((source, idx) => <SourceCitation key={`${source.title}-${idx}`} source={source} index={idx} />)}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        {isUser && <div className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-slate-200 text-slate-700 dark:bg-white/10 dark:text-white"><UserRound className="h-4 w-4" /></div>}
      </div>
    </div>
  )
}
