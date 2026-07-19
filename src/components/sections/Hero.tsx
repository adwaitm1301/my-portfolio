'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import LetterReveal from '@/components/shared/LetterReveal'

const spring = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 80,
  mass: 1,
}

export default function Hero() {
  const imageWrapRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: imageWrapRef,
    offset: ['start end', 'end start'],
  })
  const scale = useTransform(scrollYProgress, [0, 1], [1.4, 1])

  return (
    <section className="px-5 pt-24 pb-10 md:px-10 md:pt-32">
      <div className="mx-auto max-w-7xl">
        <div className="relative">
          <h1 className="font-display font-normal leading-[0.9] tracking-[-0.06em] text-[clamp(48px,8vw,96px)]">
            <LetterReveal text="Adwait M." delay={0} />
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="absolute right-0 top-2 font-display text-lg text-neutral-600 md:text-2xl"
          >
            [ Est.2006 ]
          </motion.p>
        </div>

        <h2 className="mt-2 font-display font-normal leading-[0.9] tracking-[-0.06em] text-accent text-[clamp(32px,7vw,88px)]">
          <LetterReveal text="Building at the" delay={0.35} stagger={0.015} />
          <br />
          <LetterReveal
            text="intersection of AI and"
            delay={0.55}
            stagger={0.015}
          />
          <br />
          <LetterReveal text="Markets" delay={0.85} stagger={0.015} />
        </h2>

        <p className="mt-3 font-serif italic leading-[1.05] tracking-[-0.02em] text-accent-red text-[clamp(28px,6vw,72px)]">
          <LetterReveal text="Undergrad @ BITS Pilani." delay={1.0} stagger={0.012} />
        </p>

        {/* Hero image: transparent cutout with parallax over animated background */}
        <motion.div
          ref={imageWrapRef}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.6 }}
          className="mt-14 overflow-hidden"
        >
          <motion.div
            style={{ scale, willChange: 'transform' }}
            className="aspect-[3/2] w-full origin-center"
          >
            <motion.img
              src="/images/hero.png"
              alt="Adwait M."
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="w-full h-full object-contain"
            />
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
