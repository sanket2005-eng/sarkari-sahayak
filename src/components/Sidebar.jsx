import React from 'react'
import { BookOpen, ChevronRight, CircleHelp, FileText, Landmark, Moon, RotateCcw, Scale, Sun, X } from 'lucide-react'
import BrandMark from './BrandMark'
import { domainMeta, starterQuestions } from '../data/mockData'

const domainIcons = { Tax: FileText, RTI: BookOpen, 'Labour Law': Scale }

export default function Sidebar({ domain, setDomain, onStarter, theme, setTheme, mobileOpen, setMobileOpen }) {
  return (
    <>
      {mobileOpen && <button aria-label="Close sidebar" className="fixed inset-0 z-30 bg-ink-950/40 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)} />}
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-[286px] flex-col border-r border-slate-200/80 bg-white/95 p-4 shadow-soft backdrop-blur-xl transition-transform dark:border-white/10 dark:bg-slate-950/95 lg:static lg:z-10 lg:translate-x-0 lg:shadow-none ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="mb-6 flex items-center justify-between px-1">
          <BrandMark />
          <button className="focus-ring grid h-9 w-9 place-items-center rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Close navigation">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-3 flex items-center justify-between px-1">
          <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">Knowledge domains</div>
          <Landmark className="h-4 w-4 text-slate-400" />
        </div>
        <div className="space-y-1.5">
          {Object.keys(domainMeta).map(name => {
            const Icon = domainIcons[name]
            const active = domain === name
            return (
              <button key={name} onClick={() => { setDomain(name); setMobileOpen(false) }} className={`focus-ring group flex w-full items-center gap-3 rounded-2xl border px-3 py-3 text-left transition ${active ? 'border-sky-200 bg-sky-50 text-ink-900 dark:border-sky-500/20 dark:bg-sky-500/10 dark:text-white' : 'border-transparent text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-white/5'}`}>
                <span className={`grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br ${domainMeta[name].accent} text-white shadow-sm`}>
                  <Icon className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold">{name}</span>
                  <span className="block truncate text-[11px] text-slate-400">{domainMeta[name].description}</span>
                </span>
                <ChevronRight className={`h-4 w-4 transition-transform ${active ? 'text-sky-600 dark:text-sky-300' : 'text-slate-300 group-hover:translate-x-0.5'}`} />
              </button>
            )
          })}
        </div>

        <div className="my-6 h-px bg-slate-200 dark:bg-white/10" />

        <div className="mb-3 px-1 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">Try asking</div>
        <div className="space-y-2">
          {starterQuestions[domain].map((q) => (
            <button key={q} onClick={() => { onStarter(q); setMobileOpen(false) }} className="focus-ring group flex w-full items-start gap-2 rounded-xl px-2.5 py-2 text-left text-xs leading-5 text-slate-600 transition hover:bg-slate-50 hover:text-ink-900 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white">
              <CircleHelp className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky-500" />
              <span>{q}</span>
            </button>
          ))}
        </div>

        <div className="mt-auto space-y-2 pt-4">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-white/10 dark:bg-white/[0.03]">
            <div className="flex items-start gap-2">
              <div className="mt-0.5 h-2 w-2 rounded-full bg-indiaGreen" />
              <div>
                <div className="text-xs font-semibold text-slate-700 dark:text-slate-200">Grounded by design</div>
                <div className="mt-1 text-[11px] leading-4 text-slate-500 dark:text-slate-400">Answers are designed to surface official sources instead of guessing.</div>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="focus-ring flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5" onClick={() => window.location.reload()}>
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </button>
            <button className="focus-ring grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle theme">
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
