'use client'

import Reveal from '@/components/shared/Reveal'
import { motion } from 'framer-motion'

interface Testimonial {
  quote: string
  author: string
  title: string
  company: string
  image: string
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Adwait built AntarYatra in 4 months and it changed how we think about travel planning. The platform handles 1000+ users daily without a hiccup. His technical depth and shipping speed are unmatched.",
    author: 'Raj Patel',
    title: 'Co-founder',
    company: 'TravelTech Ventures',
    image: '👤',
  },
  {
    quote:
      "I've used 10+ backtesting platforms. Adwait's backtester is the fastest and most accurate. It saved me thousands by catching strategy flaws before I risked real capital. Highly recommend.",
    author: 'Maya Singh',
    title: 'Quantitative Trader',
    company: 'Independent',
    image: '📈',
  },
  {
    quote:
      "Working with Adwait on ML optimization was incredible. He took our 78% accuracy model to 94% in weeks. His understanding of both theory and production deployment is rare at this level.",
    author: 'Arun Kumar',
    title: 'ML Lead',
    company: 'AudioTech AI',
    image: '🎵',
  },
]

export default function Testimonials() {
  return (
    <section className="px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-16">
            <p className="font-display text-sm font-medium text-accent mb-4">
              [ PROOF ]
            </p>
            <h2 className="mb-4 font-display text-5xl font-normal tracking-[-0.04em] md:text-7xl">
              What People Say
            </h2>
            <p className="font-serif italic text-lg text-neutral-400">
              Real feedback from users, traders, and collaborators
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <motion.div
                className="border border-neutral-800 rounded-lg p-6 bg-black/50 hover:border-accent/50 transition-colors flex flex-col h-full"
                whileHover={{ y: -5 }}
              >
                <p className="text-neutral-300 mb-6 leading-relaxed flex-1 font-serif italic">
                  "{testimonial.quote}"
                </p>

                <div className="border-t border-neutral-700 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{testimonial.image}</div>
                    <div>
                      <p className="font-display font-medium text-white">
                        {testimonial.author}
                      </p>
                      <p className="text-xs text-neutral-400">
                        {testimonial.title}
                      </p>
                      <p className="text-xs text-accent">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3} className="mt-16">
          <div className="text-center border-t border-neutral-800 pt-12">
            <p className="text-neutral-400 mb-6">
              Want to share feedback about working together?
            </p>
            <a
              href="mailto:adwait.m.1301@gmail.com?subject=Testimonial"
              className="inline-block text-accent hover:underline transition-colors"
            >
              Send me a message →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
