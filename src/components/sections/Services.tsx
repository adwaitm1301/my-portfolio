'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { services } from '@/data/services'
import Reveal from '@/components/shared/Reveal'

export default function Services() {
  const [open, setOpen] = useState<string | null>(services[1].id)

  return (
    <section id="services" className="px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-16 flex items-end justify-between">
            <h2 className="font-display text-5xl font-normal tracking-[-0.04em] md:text-7xl">
              Explore{' '}
              <span className="font-serif italic">/ Services</span>
            </h2>
            <Link
              href="#services"
              className="hidden font-display text-sm text-accent-red transition-colors hover:text-accent md:block"
            >
              [ EXPLORE MORE ] ↗
            </Link>
          </div>
        </Reveal>

        <div>
          {services.map((service, index) => {
            const isOpen = open === service.id
            return (
              <Reveal key={service.id} delay={index * 0.05}>
                <div className="border-t border-neutral-800">
                  <button
                    onClick={() => setOpen(isOpen ? null : service.id)}
                    className="grid w-full grid-cols-[1fr_2fr_auto] items-start gap-6 py-8 text-left md:grid-cols-[1fr_2fr_1fr_auto]"
                  >
                    <span className="font-display text-sm text-neutral-500">
                      {String(index + 1).padStart(3, '0')}
                    </span>
                    <span className="font-display text-2xl font-medium leading-tight text-neutral-300 md:text-3xl">
                      {service.title}
                    </span>
                    <span className="hidden md:block" />
                    <span className="font-display text-2xl text-neutral-500">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-[1fr_2fr] gap-6 pb-10 md:grid-cols-[1fr_2fr_1fr_auto]">
                          <span />
                          <div className="max-w-md">
                            <p className="mb-3 font-display text-sm font-semibold uppercase tracking-wide text-white">
                              What We Do
                            </p>
                            <p className="text-sm leading-relaxed text-neutral-400">
                              {service.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            )
          })}
          <div className="border-t border-neutral-800" />
        </div>
      </div>
    </section>
  )
}
