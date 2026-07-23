'use client'

import { useState } from 'react'
import Reveal from '@/components/shared/Reveal'
import { motion, AnimatePresence } from 'framer-motion'

interface CaseStudy {
  id: string
  title: string
  shortDesc: string
  image: string
  challenge: string
  solution: string
  results: string[]
  metrics: { label: string; value: string }[]
  techStack: string[]
  link: string
}

const caseStudies: CaseStudy[] = [
  {
    id: 'antaryatra',
    title: 'AntarYatra',
    shortDesc: 'AI-powered mental wellness and journaling platform',
    image: 'https://framerusercontent.com/images/MtIaN53bNrgNKXXvdrGD6gHwWrM.jpg?scale-down-to=1024',
    challenge:
      'Students struggle with anxiety and have nobody helping them understand their patterns. Mental health support is expensive, stigmatized, and rarely available in Indian languages.',
    solution:
      'Built an AI-powered journaling platform that analyzes entries for emotional patterns and returns real-time insights in the language you write in. Automatic language detection across 12+ Indian languages, deployed on auto-scaling infrastructure.',
    results: [
      'Free for students, still in active development',
      'AI insights across 12+ Indian languages including Hindi, Tamil, and Bengali',
      'Full stack built solo: AI pipeline, frontend, backend, deployment',
    ],
    metrics: [
      { label: 'Languages', value: '12+' },
      { label: 'Cost to Users', value: 'Free' },
      { label: 'Built By', value: 'One person' },
      { label: 'Status', value: 'In development' },
    ],
    techStack: ['React', 'Node.js', 'MongoDB', 'Redis', 'AWS', 'TensorFlow'],
    link: '/work/antaryatra',
  },
]

interface CaseStudyCardProps {
  study: CaseStudy
  isOpen: boolean
  onToggle: () => void
  index: number
}

function CaseStudyCard({ study, isOpen, onToggle, index }: CaseStudyCardProps) {
  return (
    <Reveal delay={index * 0.1}>
      <motion.div
        className="border border-neutral-800 rounded-lg overflow-hidden hover:border-accent/50 transition-colors bg-black/50"
        layout
      >
        {/* Header */}
        <button
          onClick={onToggle}
          className="w-full text-left p-6 hover:bg-black/70 transition-colors"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-display text-2xl font-medium text-white mb-2">
                {study.title}
              </h3>
              <p className="text-neutral-400">{study.shortDesc}</p>
            </div>
            <motion.span
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-2xl flex-shrink-0 mt-1"
            >
              ▼
            </motion.span>
          </div>
        </button>

        {/* Expandable Content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-neutral-800"
            >
              <div className="p-6 space-y-8">
                {/* Image */}
                <img
                  src={study.image}
                  alt={study.title}
                  className="w-full rounded-lg aspect-[16/9] object-cover"
                />

                {/* Challenge & Solution */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-display font-medium text-accent mb-3">
                      The Challenge
                    </h4>
                    <p className="text-neutral-300 leading-relaxed">
                      {study.challenge}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-display font-medium text-accent mb-3">
                      The Solution
                    </h4>
                    <p className="text-neutral-300 leading-relaxed">
                      {study.solution}
                    </p>
                  </div>
                </div>

                {/* Metrics */}
                <div>
                  <h4 className="font-display font-medium text-accent mb-4">
                    The Impact
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {study.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="border border-neutral-700 rounded-lg p-4 text-center bg-black/50"
                      >
                        <p className="font-display text-xl font-medium text-accent mb-1">
                          {metric.value}
                        </p>
                        <p className="text-xs text-neutral-400">{metric.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Results */}
                <div>
                  <h4 className="font-display font-medium text-accent mb-4">
                    Results & Outcomes
                  </h4>
                  <ul className="space-y-2">
                    {study.results.map((result, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-neutral-300"
                      >
                        <span className="text-accent mt-1 flex-shrink-0">✓</span>
                        <span>{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div>
                  <h4 className="font-display font-medium text-accent mb-4">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {study.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 bg-neutral-900 border border-neutral-700 rounded-lg text-sm text-neutral-300 hover:border-accent/50 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <a
                  href={study.link}
                  className="inline-block bg-accent hover:bg-accent/90 text-black font-display font-semibold px-6 py-2.5 rounded-lg transition-all hover:scale-105"
                >
                  View Full Project →
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Reveal>
  )
}

export default function CaseStudies() {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <section className="px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <h2 className="mb-4 font-display text-5xl font-normal tracking-[-0.04em] md:text-7xl">
            Case Studies
          </h2>
          <p className="mb-12 font-serif italic text-lg text-neutral-400">
            Deep dives into real projects. Click to explore the challenge, solution, and impact.
          </p>
        </Reveal>

        <div className="space-y-4">
          {caseStudies.map((study, idx) => (
            <CaseStudyCard
              key={study.id}
              study={study}
              isOpen={openId === study.id}
              onToggle={() => setOpenId(openId === study.id ? null : study.id)}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
