'use client'

import Reveal from '@/components/shared/Reveal'
import { motion } from 'framer-motion'

export default function Availability() {
  const availabilityTypes = [
    {
      title: 'Quick Chat',
      duration: '30 min',
      description: 'Quick sync to discuss ideas, answer questions, or explore opportunities',
      icon: '💬',
    },
    {
      title: 'Deep Dive',
      duration: '1 hour',
      description: 'Detailed conversation for technical discussions, consulting, or project planning',
      icon: '🔍',
    },
    {
      title: 'Strategy Session',
      duration: '1.5 hours',
      description: 'Comprehensive discussion for partnerships, co-founder roles, or major projects',
      icon: '🎯',
    },
  ]

  return (
    <section className="px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <h2 className="mb-4 font-display text-5xl font-normal tracking-[-0.04em] md:text-7xl">
            Let's Talk
          </h2>
          <p className="mb-16 font-serif italic text-lg text-neutral-400">
            I'm available for conversations about projects, ideas, and opportunities.
          </p>
        </Reveal>

        {/* Availability Types */}
        <div className="mb-16 space-y-4">
          {availabilityTypes.map((type, idx) => (
            <Reveal key={type.title} delay={idx * 0.08}>
              <div className="group border border-neutral-800 rounded-lg p-6 hover:border-accent/50 transition-colors bg-black/50 hover:bg-black/70">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{type.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3 mb-2">
                      <h3 className="font-display text-xl font-medium text-white">
                        {type.title}
                      </h3>
                      <span className="text-sm text-neutral-400">
                        {type.duration}
                      </span>
                    </div>
                    <p className="text-neutral-300">{type.description}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Calendar Integration */}
        <Reveal delay={0.3}>
          <div className="border-2 border-accent/30 rounded-lg p-8 bg-gradient-to-br from-accent/5 to-transparent">
            <div className="text-center">
              <p className="font-display text-2xl font-medium text-white mb-2">
                Pick a time that works for you
              </p>
              <p className="text-neutral-300 mb-8">
                My calendar is live, just pick a slot that fits your timezone
              </p>

              <a
                href="https://calendly.com/adwait-m-1301"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-accent hover:bg-accent/90 text-black font-display font-semibold px-8 py-4 rounded-lg transition-all hover:scale-105 mb-6"
              >
                Open My Calendar
              </a>

              <p className="text-sm text-neutral-400">
                or{' '}
                <a
                  href="mailto:adwait.m.1301@gmail.com?subject=Let's%20schedule%20a%20meeting"
                  className="text-accent hover:underline transition-colors"
                >
                  email me directly
                </a>
              </p>
            </div>
          </div>
        </Reveal>

        {/* Response Time */}
        <Reveal delay={0.4} className="mt-12">
          <div className="border-t border-neutral-800 pt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="font-display text-3xl font-medium text-accent mb-2">
                  24h
                </p>
                <p className="text-sm text-neutral-400">
                  Average response time
                </p>
              </div>
              <div className="text-center">
                <p className="font-display text-3xl font-medium text-accent mb-2">
                  🌍
                </p>
                <p className="text-sm text-neutral-400">
                  Flexible timezone
                </p>
              </div>
              <div className="text-center">
                <p className="font-display text-3xl font-medium text-accent mb-2">
                  ✓
                </p>
                <p className="text-sm text-neutral-400">
                  Always open to ideas
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
