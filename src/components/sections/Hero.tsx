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
          <h1 className="font-display font-normal leading-[0.9] tracking-[-0.06em] text-[clamp(48px,10.5vw,134px)]">
            <LetterReveal text="Adwait" />
            <br />
            <LetterReveal text="M." delay={0.12} />
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

        <h2 className="mt-2 font-display font-normal leading-[0.9] tracking-[-0.06em] text-accent text-[clamp(40px,9.5vw,120px)]">
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

        <p className="mt-3 font-serif italic leading-[1.05] tracking-[-0.02em] text-accent-red text-[clamp(34px,7.5vw,96px)]">
          <LetterReveal text="Undergrad @" delay={1.0} stagger={0.012} />
          <br />
          <LetterReveal text="BITS Pilani." delay={1.25} stagger={0.012} />
        </p>

        {/* Hero image: professional headshot with parallax */}
        <motion.div
          ref={imageWrapRef}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.6 }}
          className="mt-14 overflow-hidden rounded-2xl"
        >
          <motion.div
            style={{ scale, willChange: 'transform' }}
            className="aspect-[3/4] md:aspect-[2/3] w-full max-w-md origin-center"
          >
            <motion.img
              src="/images/hero.jpg"
              alt="Adwait M."
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
