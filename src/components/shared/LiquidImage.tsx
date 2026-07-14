'use client'

import { motion } from 'framer-motion'
import { useEffect, useId } from 'react'

interface LiquidImageProps {
  src: string
  alt: string
  className?: string
}

export default function LiquidImage({ src, alt, className = '' }: LiquidImageProps) {
  const filterId = useId()

  useEffect(() => {
    const animate = () => {
      const filter = document.getElementById(filterId) as SVGFETurbulenceElement | null
      if (filter) {
        const baseFrequency = 0.02 + Math.sin(Date.now() * 0.0005) * 0.01
        filter.setAttribute('baseFrequency', baseFrequency.toString())
      }
    }

    const interval = setInterval(animate, 50)
    return () => clearInterval(interval)
  }, [filterId])

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
        <defs>
          <filter id={filterId}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.02"
              numOctaves="4"
              result="noise"
              seed="2"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="15"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <motion.img
        src={src}
        alt={alt}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          filter: `url(#${filterId})`,
          willChange: 'filter',
        }}
        className="w-full h-full object-cover"
      />
    </div>
  )
}
