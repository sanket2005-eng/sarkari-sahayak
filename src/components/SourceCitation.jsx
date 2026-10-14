import React, { useState } from 'react'
import { ExternalLink, FileSearch } from 'lucide-react'

export default function SourceCitation({ source, index }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="sm:relative" onPointerEnter={e => e.pointerType === 'mouse' && setOpen(true)} onPointerLeave={e => e.pointerType === 'mouse' && setOpen(false)}>
      <button
        className="focus-ring group inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:text-sky-700 dark:border-white/10 dark:bg-slate-950/50 dark:text-slate-300 dark:hover:border-sky-400/30 dark:hover:text-sky-300"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="grid h-4 min-w-4 place-items-center rounded-full bg-slate-100 px-1 text-[9px] font-bold text-slate-500 dark:bg-white/10 dark:text-slate-300">{index + 1}</span>
        <FileSearch className="h-3.5 w-3.5" />
        <span className="max-w-[60vw] truncate sm:max-w-[210px]">{source.title}</span>
      </button>
      {open && (
        <div className="fixed inset-x-4 bottom-24 z-50 sm:absolute sm:inset-x-auto sm:bottom-full sm:left-0 sm:mb-2 sm:w-[340px] animate-slide-in rounded-2xl border border-slate-200 bg-white p-3 text-left shadow-soft dark:border-white/10 dark:bg-slate-900">
          <div className="mb-1 flex items-start justify-between gap-2">
            <div className="text-xs font-bold text-ink-900 dark:text-white">{source.title}</div>
            <ExternalLink className="h-3.5 w-3.5 shrink-0 text-slate-400" />
          </div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-sky-600 dark:text-sky-300">{source.section}</div>
          <p className="text-[11px] leading-5 text-slate-600 dark:text-slate-300">{source.snippet}</p>
        </div>
      )}
    </div>
  )
}
