'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Loading spinner on page transitions between subpages.
 * Listens to Next.js router events and shows a spinner.
 */
export default function PageTransitionLoader() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const handleStart = () => setIsLoading(true)
    const handleEnd = () => setIsLoading(false)

    // Listen to router navigation
    router.prefetch = ((original) => {
      return (href) => {
        setIsLoading(true)
        return original(href)
      }
    })(router.prefetch)

    // Fallback: use a 300ms timeout to catch navigation
    const originalPush = router.push
    router.push = function (href, options) {
      setIsLoading(true)
      const timer = setTimeout(() => setIsLoading(false), 2000)
      return originalPush.call(this, href, options).finally(() => {
        clearTimeout(timer)
        setIsLoading(false)
      })
    }

    return () => {
      router.push = originalPush
    }
  }, [router])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/40 backdrop-blur-sm"
        >
          {/* Spinning ring loader */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="h-12 w-12 border-2 border-neutral-800 border-t-accent rounded-full"
          />

          {/* Center dot */}
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute h-3 w-3 rounded-full bg-accent"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
