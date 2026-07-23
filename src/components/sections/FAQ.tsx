'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from '@/components/shared/Reveal'

interface Message {
  id: string
  type: 'bot' | 'user'
  text: string
}

interface FAQItem {
  question: string
  answer: string
}

const FAQS: FAQItem[] = [
  {
    question: 'What projects have you shipped?',
    answer:
      'AntarYatra, a full-stack AI wellness platform deployed live. The case study breaks down the architecture, trade-offs, and lessons learned building it.',
  },
  {
    question: 'What is your tech depth?',
    answer:
      'Python (PyTorch, NumPy, scikit-learn) for ML systems. TypeScript/React for full-stack. C and C++ for performance-critical and systems work. Comfortable at multiple levels: theory, implementation, and production deployment.',
  },
  {
    question: 'What core CS concepts matter to you?',
    answer:
      'Algorithms and data structures (competitive coding background). Systems design and low-latency optimization. Machine learning (theory and practice). Distributed systems. I care about understanding the "why," not just memorizing solutions.',
  },
  {
    question: 'Can I see your code?',
    answer:
      'GitHub hosts most projects with full source. Case studies break down architecture decisions, technical challenges, and trade-offs. Authentic implementations with real-world constraints.',
  },
  {
    question: 'Are you into competitive programming?',
    answer:
      'Yes. Codeforces, LeetCode, algorithm competitions. Strong foundation in algorithmic problem-solving. However, the most valuable learning comes from building production systems — real-world problems teach more than contest challenges.',
  },
  {
    question: 'What are you currently learning?',
    answer:
      'Low-latency systems and optimization (profiling, cache behavior, syscalls). Quantitative finance fundamentals. Comparing languages: Rust vs C++ for production systems. Diving deep into ML systems design.',
  },
  {
    question: 'What made you interested in ML and markets?',
    answer:
      'Markets are concrete. You build something and you see if it works on real data. ML needs evaluation metrics, not just intuition. The intersection is where engineering discipline meets complex problems.',
  },
  {
    question: 'How do I connect with you?',
    answer:
      'Email or Calendly. Respond within 24 hours. Interested in internships, collaborations, technical discussions, or just talking about interesting CS/systems problems.',
  },
  {
    question: 'What internships are you looking for?',
    answer:
      'ML systems engineering, quantitative research, backend/systems, or full-stack. Seeking positions with meaningful project ownership. Drawn to companies solving challenging technical problems.',
  },
  {
    question: 'What do you want to build long-term?',
    answer:
      'High-performance intelligent systems. Problems at the intersection of machine learning and systems optimization. Exploring startups, research, or scaled teams — the technical challenge matters most.',
  },
]

export default function FAQ() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [asked, setAsked] = useState<Set<number>>(new Set())
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to latest message inside the container only
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
    }
  }, [messages, isTyping])

  // Greeting on mount
  useEffect(() => {
    const t = setTimeout(() => {
      setMessages([
        {
          id: 'greeting',
          type: 'bot',
          text: "Questions about my background and interests? Select any topic below to learn more.",
        },
      ])
    }, 400)
    return () => clearTimeout(t)
  }, [])

  const handleAsk = (index: number) => {
    if (isTyping || asked.has(index)) return
    const faq = FAQS[index]

    setAsked((prev) => new Set(prev).add(index))
    setMessages((prev) => [
      ...prev,
      { id: `q-${index}`, type: 'user', text: faq.question },
    ])

    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        { id: `a-${index}`, type: 'bot', text: faq.answer },
      ])
    }, 700)
  }

  const allAsked = asked.size === FAQS.length

  return (
    <section id="faq" className="px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <h2 className="mb-4 font-display text-5xl font-normal tracking-[-0.04em] md:text-7xl">
            FAQ
          </h2>
          <p className="mb-16 font-serif italic text-lg text-neutral-400">
            The questions I get asked most, answered.
          </p>
        </Reveal>

        {/* Chat Container */}
        <Reveal delay={0.1}>
          <div
            className="relative rounded-2xl overflow-hidden backdrop-blur-xl p-6 md:p-8 min-h-96 flex flex-col"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.01) 100%)',
              border: '1px solid rgba(255,255,255,0.15)',
              boxShadow:
                '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255,255,255,0.2)',
            }}
          >
            {/* Messages */}
            <div
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto mb-6 space-y-4 min-h-64 max-h-96 scroll-smooth pr-2"
            >
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${
                      msg.type === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-xs px-4 py-3 rounded-2xl text-sm leading-relaxed backdrop-blur-sm ${
                        msg.type === 'user'
                          ? 'bg-accent/20 border border-accent/40 text-white rounded-br-none'
                          : 'bg-neutral-800/40 border border-neutral-700/40 text-neutral-200 rounded-bl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2 justify-start"
                >
                  <div className="bg-neutral-800/40 px-4 py-3 rounded-2xl rounded-bl-none flex gap-2">
                    <div className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce"
                      style={{ animationDelay: '0.1s' }}
                    />
                    <div
                      className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce"
                      style={{ animationDelay: '0.2s' }}
                    />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Question chips */}
            {!allAsked ? (
              <div className="flex flex-wrap gap-2">
                {FAQS.map((faq, i) =>
                  asked.has(i) ? null : (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => handleAsk(i)}
                      disabled={isTyping}
                      className="bg-neutral-900/50 border border-neutral-700/50 hover:border-accent/50 text-neutral-300 hover:text-accent text-sm px-4 py-2 rounded-lg transition-colors disabled:opacity-40"
                    >
                      {faq.question}
                    </motion.button>
                  )
                )}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-4"
              >
                <p className="text-accent font-semibold mb-2">
                  That&apos;s everything! 🙌
                </p>
                <p className="text-neutral-400 text-sm">
                  Still have a question? Reach out below and I&apos;ll answer personally.
                </p>
              </motion.div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
