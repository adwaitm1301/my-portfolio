'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { CSSProperties } from 'react'

interface LetterRevealProps {
  text: string
  delay?: number
  stagger?: number
  className?: string
  style?: CSSProperties
}

/**
 * Framer-style per-character text reveal:
 * each char starts opacity 0, blur(10px), y+10px and staggers in.
 */
export default function LetterReveal({
  text,
  delay = 0,
  stagger = 0.02,
  className,
  style,
}: LetterRevealProps) {
  const reduce = useReducedMotion()
  const words = text.split(' ')
  let charIndex = 0

  if (reduce) {
    return (
      <span className={className} style={style}>
        {text}
      </span>
    )
  }

  return (
    <span className={className} style={style} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} style={{ display: 'inline-block', whiteSpace: 'pre' }}>
          {word.split('').map((char, ci) => {
            const i = charIndex++
            return (
              <motion.span
                key={ci}
                aria-hidden
                style={{ display: 'inline-block' }}
                initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.5,
                  delay: delay + i * stagger,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                {char}
              </motion.span>
            )
          })}
          {wi < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  )
}
