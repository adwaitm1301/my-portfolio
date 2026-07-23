'use client'

import Reveal from '@/components/shared/Reveal'
import { motion } from 'framer-motion'

export default function Philosophy() {
  return (
    <section className="px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <h2 className="mb-8 font-display text-5xl font-normal tracking-[-0.04em] md:text-7xl">
            Why I Build
          </h2>
        </Reveal>

        <div className="space-y-8">
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-neutral-300">
              I believe technology should solve real problems for real people. Not algorithms for their own sake. Not features nobody asked for. Not vanity metrics that look good in pitch decks but don't matter to users.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-lg leading-relaxed text-neutral-300">
              I saw students struggling with anxiety and nobody helping them understand their patterns. So I built AntarYatra.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="text-lg leading-relaxed text-neutral-300">
              The metric I care about isn't monthly active users or growth rate. It's impact. Did this actually help someone? Did it solve a problem they cared about? Is it accurate? Does it scale?
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="border-l-4 border-accent pl-6 py-4">
              <p className="font-serif italic text-xl text-accent">
                I learn by building. I validate by shipping. I succeed when users benefit.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.5}>
            <p className="text-lg leading-relaxed text-neutral-300">
              That's why I'm looking for teams and opportunities where we can think long term. Where technical excellence matters. Where we actually care about the people using what we build. Where speed and quality both matter.
            </p>
          </Reveal>

          <Reveal delay={0.6}>
            <div className="grid grid-cols-3 gap-4 pt-8">
              {[
                { label: 'Speed', desc: 'Move fast but don\'t break things' },
                { label: 'Quality', desc: 'Excellence in execution matters' },
                { label: 'Impact', desc: 'User outcomes over vanity metrics' },
              ].map((principle) => (
                <motion.div
                  key={principle.label}
                  className="border border-neutral-800 rounded-lg p-4 text-center hover:border-accent/50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  <p className="font-display font-medium text-white mb-1">
                    {principle.label}
                  </p>
                  <p className="text-xs text-neutral-400">{principle.desc}</p>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
