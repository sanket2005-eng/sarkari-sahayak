import React, { useEffect, useMemo, useState } from 'react'
import { Menu, ShieldCheck, Sparkles } from 'lucide-react'
import Sidebar from './components/Sidebar'
import ChatWindow from './components/ChatWindow'
import InputBar from './components/InputBar'
import BrandMark from './components/BrandMark'
import { starterQuestions } from './data/mockData'
import { queryRag } from './services/ragApi'

const makeId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`

const initialMessage = {
  id: makeId(),
  role: 'assistant',
  confidence: 'High',
  retrieved: 3,
  answer: 'Hello! I’m Sarkari Sahayak. Ask me about Indian government and public-policy topics, and I’ll answer using the documents available to my knowledge layer. I’ll surface the relevant source sections so you can verify the answer.',
  eli5: 'Hi! I’m Sarkari Sahayak. Ask me a government question and I’ll try to answer using my documents. I’ll also show you where the information came from.',
  sources: [
    { title: 'Sarkari Sahayak — Grounding Policy', section: 'Answer policy', snippet: 'This demo prioritizes retrieved documents and avoids fabricating an answer when retrieval confidence is low.' },
    { title: 'Mock Government Knowledge Base', section: 'Demo corpus', snippet: 'Contains representative source entries for Tax, RTI, and Labour Law questions.' },
    { title: 'Citation Interface', section: 'Source metadata', snippet: 'Source chips expose document title, section, and a short retrieved-text preview.' }
  ]
}

function App() {
  const [domain, setDomain] = useState('Tax')
  const [theme, setTheme] = useState(() => localStorage.getItem('sarkari-theme') || 'light')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [messages, setMessages] = useState([initialMessage])
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('sarkari-theme', theme)
  }, [theme])

  const domainQuestions = useMemo(() => starterQuestions[domain], [domain])

  const ask = (query) => {
    if (!query || busy) return
    setMessages(prev => [...prev, { id: makeId(), role: 'user', content: query }, { id: makeId(), role: 'assistant', loading: true }])
    setBusy(true)
    queryRag({ query, domain }).then(result => {
      setMessages(prev => {
        const next = [...prev]
        const idx = next.findIndex(m => m.loading)
        if (idx >= 0) next.splice(idx, 1, {
          id: makeId(),
          role: 'assistant',
          ...result,
          noAnswer: result.confidence === 'Low'
        })
        return next
      })
      setBusy(false)
    })
  }

  return (
    <div className="flex h-screen h-dvh overflow-hidden bg-[#f7fafc] text-ink-900 dark:bg-ink-950 dark:text-white">
      <Sidebar domain={domain} setDomain={setDomain} onStarter={ask} theme={theme} setTheme={setTheme} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <section className="flex min-w-0 flex-1 flex-col">
        <header className="z-20 flex h-[72px] shrink-0 items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/85 sm:px-6">
          <div className="flex items-center gap-3 lg:hidden">
            <button className="focus-ring grid h-10 w-10 place-items-center rounded-xl text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Menu className="h-5 w-5" /></button>
            <BrandMark compact />
          </div>
          <div className="hidden items-center gap-3 lg:flex">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300"><Sparkles className="h-4.5 w-4.5" /></div>
            <div>
              <div className="text-sm font-bold">{domain} knowledge assistant</div>
              <div className="text-[11px] text-slate-400">Retrieval-grounded demo workspace</div>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-indiaGreen" /> Live demo corpus
            </div>
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-ink-900 text-white dark:bg-sky-900"><ShieldCheck className="h-4 w-4" /></div>
          </div>
        </header>

        <div className="flex min-h-0 flex-1 flex-col">
          <ChatWindow messages={messages} />
          <div className="mx-auto w-full max-w-4xl px-4 pb-2 sm:px-6">
            <div className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {domainQuestions.map(q => <button key={q} disabled={busy} onClick={() => ask(q)} className="focus-ring whitespace-nowrap rounded-full border border-slate-200 bg-white px-3 py-2 text-[11px] font-semibold text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:text-sky-700 disabled:opacity-50 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-sky-500/30 dark:hover:text-sky-300">{q}</button>)}
            </div>
          </div>
          <InputBar onSend={ask} disabled={busy} domain={domain} />
        </div>
      </section>
    </div>
  )
}

export default App
