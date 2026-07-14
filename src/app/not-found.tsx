'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

// The "crash" line: starts healthy, then falls off a cliff to a flatline.
const CRASH_PATH =
  'M0,80 L40,72 L80,78 L120,60 L160,66 L200,48 L240,54 L280,36 L320,44 L360,20 L400,28 L430,24 L450,140 L480,150 L520,146 L560,152 L600,150 L640,151 L680,150 L720,151 L760,150 L800,150'

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5">
      {/* Ticker strip */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 flex items-center gap-4 rounded-full px-5 py-2.5 font-display text-sm backdrop-blur-xl"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
          border: '1px solid rgba(255,255,255,0.12)',
        }}
      >
        <span className="font-semibold text-white">PAGE/404</span>
        <span className="text-accent-red font-semibold">▼ −100.00%</span>
        <span className="text-neutral-500">Vol: 0</span>
        <span className="hidden sm:inline text-neutral-500">Mkt Cap: null</span>
      </motion.div>

      {/* Giant 404 */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-display font-normal leading-none tracking-[-0.06em] text-[clamp(100px,22vw,280px)] text-white"
      >
        4
        <span className="text-accent-red">0</span>
        4
      </motion.h1>

      {/* Crashing chart */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="pointer-events-none -mt-6 w-full max-w-2xl"
      >
        <svg viewBox="0 0 800 160" fill="none" className="w-full">
          {/* Grid lines */}
          {[40, 80, 120].map((y) => (
            <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          ))}
          {/* Gradient fill under the line */}
          <defs>
            <linearGradient id="crash-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff1f00" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#ff1f00" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d={`${CRASH_PATH} L800,160 L0,160 Z`}
            fill="url(#crash-fill)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.6 }}
          />
          {/* The line itself, drawing left to right */}
          <motion.path
            d={CRASH_PATH}
            stroke="#ff1f00"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.5, ease: 'easeInOut' }}
          />
          {/* Flatline blip at the end */}
          <motion.circle
            cx="800"
            cy="150"
            r="4"
            fill="#ff1f00"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.3, 1] }}
            transition={{ duration: 1.2, delay: 2.4, repeat: Infinity }}
          />
        </svg>
      </motion.div>

      {/* Copy */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-8 text-center"
      >
        <p className="font-serif text-2xl italic text-neutral-300 md:text-3xl">
          This asset doesn&apos;t exist.
        </p>
        <p className="mt-3 text-sm text-neutral-500 md:text-base">
          The page you&apos;re looking for was delisted, never IPO&apos;d, or got liquidated.
          <br className="hidden md:block" />
          Your portfolio is safe. Mine is right this way.
        </p>
      </motion.div>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
      >
        <Link
          href="/"
          className="inline-block rounded-lg bg-accent px-8 py-3 font-display font-semibold text-black transition-all hover:scale-105 hover:bg-accent/90"
        >
          Buy the dip → Home
        </Link>
        <Link
          href="/case-studies"
          className="inline-block rounded-lg border border-neutral-600 px-8 py-3 font-display font-semibold text-neutral-300 transition-all hover:border-accent hover:text-accent"
        >
          See real assets
        </Link>
      </motion.div>

      {/* Ctrl+K hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="mt-12 text-xs text-neutral-600"
      >
        or press{' '}
        <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-neutral-400">Ctrl</kbd>{' '}
        <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-neutral-400">K</kbd>{' '}
        to search the whole exchange
      </motion.p>
    </main>
  )
}
