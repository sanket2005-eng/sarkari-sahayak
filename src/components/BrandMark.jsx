import React from 'react'
import { ShieldCheck } from 'lucide-react'

export default function BrandMark({ compact = false }) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-2xl bg-ink-900 shadow-sm dark:bg-sky-950">
        <div className="absolute inset-x-0 top-0 h-1 bg-saffron" />
        <div className="absolute inset-x-0 bottom-0 h-1 bg-indiaGreen" />
        <ShieldCheck className="h-5 w-5 text-white" strokeWidth={2.1} />
      </div>
      {!compact && (
        <div className="min-w-0">
          <div className="truncate text-[15px] font-bold tracking-tight text-ink-900 dark:text-white">Sarkari Sahayak</div>
          <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Grounded government answers</div>
        </div>
      )}
    </div>
  )
}
