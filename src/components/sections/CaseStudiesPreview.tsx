'use client'

import Link from 'next/link'
import Reveal from '@/components/shared/Reveal'
import { motion } from 'framer-motion'

const caseStudies = [
  {
    id: 'antaryatra',
    title: 'AntarYatra',
    excerpt: 'AI-powered mental wellness platform for students with real-time emotional insights across 12+ Indian languages. Full-stack built solo from AI to deployment.',
    metric: '12+ Languages',
  },
]

export default function CaseStudiesPreview() {
  return (
    <section className="px-5 py-24 md:px-10 md:py-36 bg-neutral-950/50">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="mb-4 font-display text-5xl font-normal tracking-[-0.04em] md:text-7xl">
            Work In Depth
          </h2>
          <p className="mb-16 font-serif italic text-lg text-neutral-400">
            Deep dives into how I solved real problems. Challenge, solution, impact.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((study, idx) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Link href={`/case-studies#${study.id}`}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="group relative h-full rounded-2xl overflow-hidden backdrop-blur-xl p-8 cursor-pointer transition-all"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.02) 100%)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255,255,255,0.25)',
                  }}
                >
                  {/* Glass shine */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-display text-xl font-semibold text-white">
                          {study.title}
                        </h3>
                      </div>
                      <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                        {study.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-neutral-700/50">
                      <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                        {study.metric}
                      </span>
                      <span className="text-accent text-sm font-medium group-hover:translate-x-1 transition-transform">
                        Read More →
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
