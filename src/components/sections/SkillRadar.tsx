'use client'

import Reveal from '@/components/shared/Reveal'
import { motion } from 'framer-motion'

interface SkillData {
  category: string
  level: number
  label: string
  description: string
}

const skills: SkillData[] = [
  {
    category: 'Machine Learning',
    level: 92,
    label: 'Daily Driver',
    description: 'Model training, deployment optimization, real-world validation',
  },
  {
    category: 'Backend Development',
    level: 88,
    label: 'Daily Driver',
    description: 'APIs, databases, scalability, system design',
  },
  {
    category: 'FinTech Systems',
    level: 85,
    label: 'Deep Focus',
    description: 'Trading systems, market analysis, quantitative modeling',
  },
  {
    category: 'Frontend Development',
    level: 78,
    label: 'Comfortable',
    description: 'React, TypeScript, UI/UX, animations',
  },
  {
    category: 'DevOps & Deployment',
    level: 70,
    label: 'Comfortable',
    description: 'Docker, CI/CD pipelines, cloud infrastructure',
  },
  {
    category: 'Product Strategy',
    level: 74,
    label: 'Growing',
    description: 'Market validation, user research, strategy execution',
  },
]

export default function SkillRadar() {
  return (
    <section className="px-5 py-24 bg-neutral-950/60 md:px-10 md:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="mb-4 font-display text-5xl font-normal tracking-[-0.04em] md:text-7xl">
            Expertise Map
          </h2>
          <p className="mb-16 font-serif italic text-lg text-neutral-400">
            Skills ranked by depth and production experience
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mb-16 text-lg leading-relaxed text-neutral-300 max-w-3xl">
            Ranked by how much I've actually built with each. Daily drivers are what I reach for on every project, and growing areas are where I'm actively leveling up.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, idx) => (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              viewport={{ once: true }}
              className="group"
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="relative h-full rounded-2xl overflow-hidden backdrop-blur-xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.02) 100%)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255,255,255,0.25)',
                }}
              >
                {/* Glass shine */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                  {/* Top */}
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-white mb-3">
                      {skill.category}
                    </h3>
                    <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-4">
                      {skill.label}
                    </p>
                  </div>

                  {/* Description */}
                  <div>
                    <p className="text-sm text-neutral-300 leading-relaxed">
                      {skill.description}
                    </p>

                    {/* Progress bar */}
                    <div className="h-1 w-full bg-neutral-800/50 rounded-full overflow-hidden mt-6">
                      <motion.div
                        className="h-full rounded-full bg-accent"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ delay: 0.3 + idx * 0.05, duration: 0.8, ease: 'easeOut' }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
