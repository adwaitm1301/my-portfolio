'use client'

import { useRef, useState } from 'react'
import { useScroll, useMotionValueEvent } from 'framer-motion'

interface ScrollColorTextProps {
  text: string
  className?: string
}

/**
 * Framer "Reveal Text" effect: characters transition from #666666 to #FFFFFF
 * progressively, linked to scroll position of the paragraph.
 */
export default function ScrollColorText({ text, className }: ScrollColorTextProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const [lit, setLit] = useState(0)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.45'],
  })

  const total = text.length

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setLit(Math.round(v * total))
  })

  const words = text.split(' ')
  let charIndex = 0

  return (
    <p ref={ref} className={className} style={{ color: '#666666' }}>
      {words.map((word, wi) => (
        <span key={wi} style={{ display: 'inline-block', whiteSpace: 'pre' }}>
          {word.split('').map((char, ci) => {
            const i = charIndex++
            return (
              <span
                key={ci}
                style={{
                  color: i < lit ? '#FFFFFF' : 'rgba(129,129,129,1)',
                  transition: 'color 0.15s linear',
                }}
              >
                {char}
              </span>
            )
          })}
          {wi < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </p>
  )
}
