'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface FAQItem {
  id: string
  question: string
  answer: string
  category?: string
}

interface FAQAccordionProps {
  items: FAQItem[]
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null)

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="border border-neutral-800 rounded-lg overflow-hidden bg-black/50 hover:bg-black/70 transition-colors"
        >
          <button
            onClick={() =>
              setOpenId(openId === item.id ? null : item.id)
            }
            className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3">
                {item.category && (
                  <span className="text-xs font-bold text-accent uppercase tracking-wider px-2 py-1 bg-accent/10 rounded-full">
                    {item.category}
                  </span>
                )}
              </div>
              <h3 className="font-display text-lg font-medium text-white mt-2 leading-snug">
                {item.question}
              </h3>
            </div>
            <motion.div
              animate={{ rotate: openId === item.id ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="shrink-0 mt-1"
            >
              <ChevronDown className="w-5 h-5 text-accent" />
            </motion.div>
          </button>

          <AnimatePresence>
            {openId === item.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  duration: 0.3,
                  ease: 'easeInOut',
                }}
                className="overflow-hidden border-t border-neutral-800"
              >
                <div className="px-6 py-4 text-neutral-300 text-sm leading-relaxed">
                  {item.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
