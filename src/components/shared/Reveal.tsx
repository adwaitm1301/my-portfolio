'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
  y?: number
}

export default function Reveal({ children, delay = 0, className, y = 40 }: RevealProps) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  )
}
