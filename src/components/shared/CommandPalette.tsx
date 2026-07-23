'use client'

import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

interface CommandItem {
  id: string
  label: string
  hint: string
  section: 'Pages' | 'Projects' | 'Actions'
  icon: React.ReactNode
  perform: (router: ReturnType<typeof useRouter>) => void
}

const PageIcon = (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
)

const ProjectIcon = (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
  </svg>
)

const MailIcon = (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
)

const CalendarIcon = (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
  </svg>
)

const LinkIcon = (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
  </svg>
)

const COMMANDS: CommandItem[] = [
  { id: 'home', label: 'Home', hint: '/', section: 'Pages', icon: PageIcon, perform: (r) => r.push('/') },
  { id: 'skills', label: 'Skills & Expertise', hint: '/skills', section: 'Pages', icon: PageIcon, perform: (r) => r.push('/skills') },
  { id: 'impact', label: 'Impact & Proof', hint: '/impact', section: 'Pages', icon: PageIcon, perform: (r) => r.push('/impact') },
  { id: 'case-studies', label: 'Case Studies', hint: '/case-studies', section: 'Pages', icon: PageIcon, perform: (r) => r.push('/case-studies') },
  { id: 'p-antaryatra', label: 'AntarYatra', hint: 'Project deep dive', section: 'Projects', icon: ProjectIcon, perform: (r) => r.push('/work/antaryatra') },
  {
    id: 'copy-email', label: 'Copy Email Address', hint: 'adwait.m.1301@gmail.com', section: 'Actions', icon: MailIcon,
    perform: () => { navigator.clipboard.writeText('adwait.m.1301@gmail.com') },
  },
  {
    id: 'call', label: 'Schedule a Call', hint: 'Calendly', section: 'Actions', icon: CalendarIcon,
    perform: () => window.open('https://calendly.com/adwait-m-1301', '_blank'),
  },
  {
    id: 'github', label: 'Open GitHub', hint: 'github.com/Addyy-M13', section: 'Actions', icon: LinkIcon,
    perform: () => window.open('https://github.com/Addyy-M13', '_blank'),
  },
  {
    id: 'linkedin', label: 'Open LinkedIn', hint: 'linkedin.com/in/adwaitm1301', section: 'Actions', icon: LinkIcon,
    perform: () => window.open('https://www.linkedin.com/in/adwaitm1301/', '_blank'),
  },
]

export default function CommandPalette() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const [copied, setCopied] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return COMMANDS
    return COMMANDS.filter(
      (c) => c.label.toLowerCase().includes(q) || c.hint.toLowerCase().includes(q)
    )
  }, [query])

  const close = useCallback(() => {
    setOpen(false)
    setQuery('')
    setSelected(0)
    setCopied(false)
  }, [])

  const run = useCallback(
    (item: CommandItem) => {
      item.perform(router)
      if (item.id === 'copy-email') {
        setCopied(true)
        setTimeout(close, 800)
      } else {
        close()
      }
    },
    [router, close]
  )

  // Global shortcut: Ctrl/Cmd + K (plus the nav hint chip's custom event)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      } else if (e.key === 'Escape') {
        close()
      }
    }
    const onOpenEvent = () => setOpen(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener('open-command-palette', onOpenEvent)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('open-command-palette', onOpenEvent)
    }
  }, [close])

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50)
  }, [open])

  // Clamp selection when results change
  useEffect(() => {
    setSelected(0)
  }, [query])

  // Keep selected item in view
  useEffect(() => {
    const el = listRef.current?.querySelector('[data-selected="true"]')
    el?.scrollIntoView({ block: 'nearest' })
  }, [selected])

  const onInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelected((s) => Math.min(s + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelected((s) => Math.max(s - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (results[selected]) run(results[selected])
    }
  }

  // Group results by section, preserving order
  const sections = useMemo(() => {
    const order: CommandItem['section'][] = ['Pages', 'Projects', 'Actions']
    return order
      .map((s) => ({ name: s, items: results.filter((r) => r.section === s) }))
      .filter((s) => s.items.length > 0)
  }, [results])

  let flatIndex = -1

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[200] flex items-start justify-center px-4 pt-[18vh]"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close()
          }}
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="w-full max-w-xl overflow-hidden rounded-2xl backdrop-blur-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(30,30,30,0.92) 0%, rgba(15,15,15,0.95) 100%)',
              border: '1px solid rgba(255,255,255,0.12)',
              boxShadow: '0 24px 80px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.15)',
            }}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
              <svg className="h-5 w-5 text-neutral-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKeyDown}
                placeholder="Search pages, projects, actions..."
                className="flex-1 bg-transparent text-base text-white placeholder-neutral-500 outline-none"
                autoComplete="off"
                spellCheck={false}
              />
              <kbd className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-neutral-400">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div ref={listRef} className="max-h-[320px] overflow-y-auto p-2">
              {results.length === 0 ? (
                <p className="px-4 py-8 text-center text-sm text-neutral-500">
                  No results for &ldquo;{query}&rdquo;
                </p>
              ) : (
                sections.map((section) => (
                  <div key={section.name}>
                    <p className="px-3 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-500">
                      {section.name}
                    </p>
                    {section.items.map((item) => {
                      flatIndex++
                      const idx = flatIndex
                      const isSelected = idx === selected
                      return (
                        <button
                          key={item.id}
                          data-selected={isSelected}
                          onClick={() => run(item)}
                          onMouseMove={() => setSelected(idx)}
                          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                            isSelected ? 'bg-accent/10 text-white' : 'text-neutral-300'
                          }`}
                        >
                          <span className={isSelected ? 'text-accent' : 'text-neutral-500'}>
                            {item.icon}
                          </span>
                          <span className="flex-1 text-sm font-medium">
                            {item.id === 'copy-email' && copied ? 'Copied! ✓' : item.label}
                          </span>
                          <span className="text-xs text-neutral-500">{item.hint}</span>
                          {isSelected && (
                            <span className="text-xs text-accent">↵</span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Footer hints */}
            <div className="flex items-center gap-4 border-t border-white/10 px-5 py-3 text-[11px] text-neutral-500">
              <span className="flex items-center gap-1.5">
                <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5">↑</kbd>
                <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5">↓</kbd>
                navigate
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5">↵</kbd>
                select
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5">esc</kbd>
                close
              </span>
              <span className="ml-auto font-display text-neutral-600">Adwait M.</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
