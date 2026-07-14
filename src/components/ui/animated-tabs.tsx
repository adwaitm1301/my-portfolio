'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface Tab {
  id: string
  label: string
  href: string
}

interface AnimatedTabsProps {
  tabs: Tab[]
  defaultTab?: string
  onChange?: (tabId: string) => void
}

export function AnimatedTabs({
  tabs,
  defaultTab,
  onChange,
}: AnimatedTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].id)

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    onChange?.(tabId)
  }

  return (
    <div className="flex space-x-1 bg-neutral-900/50 backdrop-blur-sm rounded-full p-1">
      {tabs.map((tab) => (
        <motion.a
          key={tab.id}
          href={tab.href}
          target={tab.href.startsWith('http') ? '_blank' : undefined}
          rel={tab.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          onClick={() => handleTabChange(tab.id)}
          className={`
            relative rounded-full px-4 py-2 text-sm font-display font-medium
            transition-colors duration-300 cursor-pointer
            ${
              activeTab === tab.id
                ? 'text-black'
                : 'text-white hover:text-neutral-300'
            }
          `}
          style={{
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          {activeTab === tab.id && (
            <motion.span
              layoutId="bubble"
              className="absolute inset-0 z-10 bg-accent"
              style={{ borderRadius: '9999px' }}
              transition={{
                type: 'spring',
                bounce: 0.2,
                duration: 0.6,
              }}
            />
          )}
          <span className="relative z-20">{tab.label}</span>
        </motion.a>
      ))}
    </div>
  )
}
