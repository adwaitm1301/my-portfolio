'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MATRIX_CHARS = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'

export default function EasterEggs() {
  const [matrixActive, setMatrixActive] = useState(false)
  const [stockCrash, setStockCrash] = useState(false)
  const [devPanelOpen, setDevPanelOpen] = useState(false)
  const [sleepyMode, setSleepyMode] = useState(false)
  const [cheatMessage, setCheatMessage] = useState(false)
  const typedRef = useRef('')
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Check if it's late night (12am-5am) - only on mount
  useEffect(() => {
    const hour = new Date().getHours()
    if (hour >= 0 && hour < 5) {
      setSleepyMode(true)
    }
  }, [])

  // Keyboard shortcuts and typing detection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      const isFormField =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target.contentEditable === 'true'

      // Ctrl+Shift+M = Matrix mode
      if (e.ctrlKey && e.shiftKey && e.key.toUpperCase() === 'M') {
        e.preventDefault()
        setMatrixActive(true)
        setTimeout(() => setMatrixActive(false), 5000)
        return
      }

      // Ctrl+Shift+S = Stock crash
      if (e.ctrlKey && e.shiftKey && e.key.toUpperCase() === 'S') {
        e.preventDefault()
        setStockCrash(true)
        setTimeout(() => setStockCrash(false), 3000)
        return
      }

      // Ctrl+Alt+D = Dev panel
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'd') {
        e.preventDefault()
        setDevPanelOpen((prev) => !prev)
        return
      }

      // Typing detection for "cheat" (only when not in form field)
      if (!isFormField) {
        typedRef.current += e.key.toLowerCase()

        if (typedRef.current.length > 10) {
          typedRef.current = typedRef.current.slice(-10)
        }

        if (typedRef.current.includes('cheat')) {
          setCheatMessage(true)
          setTimeout(() => setCheatMessage(false), 3000)
          typedRef.current = ''
        }

        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => {
          typedRef.current = ''
        }, 2000)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <>
      {/* Matrix mode overlay */}
      <AnimatePresence>
        {matrixActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] pointer-events-none overflow-hidden"
          >
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute text-[#00ff41] font-mono text-sm font-bold"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `fall ${2 + Math.random() * 3}s linear`,
                  textShadow: '0 0 10px rgba(0,255,65,0.8)',
                }}
              >
                {MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stock crash overlay */}
      <AnimatePresence>
        {stockCrash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] pointer-events-none"
            style={{
              transform: 'rotate(2deg)',
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(90deg, transparent 0px, transparent 4px, rgba(255,0,0,0.1) 4px, rgba(255,0,0,0.1) 8px)',
              }}
            />

            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 100 }}
              className="absolute top-1/4 left-1/2 -translate-x-1/2 z-[1000]"
            >
              <div
                className="text-6xl font-black text-red-500 tracking-widest"
                style={{
                  textShadow:
                    '0 0 20px rgba(255,0,0,0.8), 0 0 40px rgba(255,0,0,0.5)',
                }}
              >
MARKET CRASHED
              </div>
            </motion.div>

            <motion.div
              animate={{ rotate: [0, -1, 1, -1, 0] }}
              transition={{ duration: 0.2, repeat: 15 }}
              className="absolute inset-0"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dev panel */}
      <AnimatePresence>
        {devPanelOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-[998] font-mono text-xs text-[#00ff41]"
            style={{
              backdropFilter: 'blur(8px)',
              background: 'rgba(0,0,0,0.8)',
              border: '1px solid #00ff41',
              borderRadius: '8px',
              padding: '16px',
              maxWidth: '300px',
            }}
          >
            <div className="space-y-2">
              <div className="text-[#00ff41] font-bold mb-3">▶ DEV STATS</div>
              <DevStat label="Page Load" value="~180ms" />
              <DevStat label="Viewport" value={`${typeof window !== 'undefined' ? window.innerWidth : 0}x${typeof window !== 'undefined' ? window.innerHeight : 0}`} />
              <DevStat label="Time on Site" value="live" />
              <button
                onClick={() => setDevPanelOpen(false)}
                className="mt-3 w-full py-1 border border-[#00ff41] hover:bg-[#00ff41]/10 transition-colors"
              >
                close_panel()
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cheat message */}
      <AnimatePresence>
        {cheatMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[998]"
          >
            <div className="text-center">
              <div
                className="text-4xl font-black text-[#00ff41] mb-2"
                style={{ textShadow: '0 0 20px rgba(0,255,65,0.8)' }}
              >
CHEATS ACTIVATED
              </div>
              <div className="text-sm text-[#00ff41]/60 font-mono">
                you are now in god mode
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sleepy mode filter */}
      {sleepyMode && (
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            background: 'radial-gradient(circle, transparent 0%, rgba(0,0,0,0.2) 100%)',
          }}
        />
      )}

      <style jsx global>{`
        @keyframes fall {
          0% {
            transform: translateY(-100vh) rotateZ(45deg);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotateZ(45deg);
            opacity: 0;
          }
        }
      `}</style>
    </>
  )
}

function DevStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-2">
      <span className="text-[#00aa22]">{label}:</span>
      <span className="text-[#00ff41]">{value}</span>
    </div>
  )
}
