'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { usePathname } from 'next/navigation'


export default function Navigation() {
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState('work')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (pathname === '/' || pathname.includes('/#work')) {
      setActiveTab('work')
    } else if (pathname.includes('/skills')) {
      setActiveTab('skills')
    } else if (pathname.includes('/impact')) {
      setActiveTab('impact')
    } else if (pathname.includes('/case-studies')) {
      setActiveTab('case-studies')
    } else if (pathname.includes('/work')) {
      setActiveTab('case-studies')
    }
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navItems = [
    { id: 'work', label: 'Work', href: '/#work' },
    { id: 'skills', label: 'Skills', href: '/skills' },
    { id: 'impact', label: 'Impact', href: '/impact' },
    { id: 'case-studies', label: 'Case Studies', href: '/case-studies' },
    { id: 'github', label: 'GitHub', href: 'https://github.com/Addyy-M13' },
    { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/adwaitm1301/' },
  ]

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        paddingTop: scrolled ? '16px' : '24px',
        paddingBottom: scrolled ? '12px' : '0px',
      }}
    >
      {/* Backdrop that appears on scroll */}
      <div
        className="absolute inset-0 transition-all duration-300"
        style={{
          background: scrolled
            ? 'rgba(0, 0, 0, 0.6)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        }}
      />

      <div className="relative mx-auto px-5 md:px-10">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Logo */}
          <Link
            href="/"
            className="font-display text-lg font-semibold text-white transition-colors hover:text-accent"
          >
            Adwait M.
          </Link>

          {/* Floating Pill Navigation */}
          <motion.div
            className="relative flex items-center rounded-full px-1 py-1"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 4px 24px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255,255,255,0.1)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
          >
            {/* Active indicator background */}
            {navItems.map((item) => (
              activeTab === item.id && (
                <motion.div
                  key={`bg-${item.id}`}
                  layoutId="activeBackground"
                  className="absolute inset-0 rounded-full bg-accent/10"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )
            ))}

            {/* Navigation items */}
            <div className="relative flex items-center gap-0.5">
              {navItems.map((item) => (
                <motion.a
                  key={item.id}
                  href={item.href}
                  onMouseEnter={() => setActiveTab(item.id)}
                  className={`relative px-3.5 py-1.5 text-[13px] font-medium rounded-full transition-colors ${
                    activeTab === item.id
                      ? 'text-accent'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Command palette hint chip */}
          <motion.button
            onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Open quick search"
            className="hidden md:flex items-center gap-2 rounded-full px-3.5 py-2 text-[12px] font-medium text-neutral-400 hover:text-neutral-200 transition-colors"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 4px 24px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255,255,255,0.1)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <span>Search</span>
            <kbd className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-neutral-500">
              Ctrl K
            </kbd>
          </motion.button>
        </div>
      </div>
    </nav>
  )
}
