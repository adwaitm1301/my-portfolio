'use client'

import { useState } from 'react'
import Reveal from '@/components/shared/Reveal'
import { motion } from 'framer-motion'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    try {
      // Connect to your email service here
      // Example: Mailchimp, ConvertKit, Brevo, etc.
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        throw new Error('Subscription failed')
      }

      setStatus('success')
      setMessage('Thanks! Check your email to confirm.')
      setEmail('')
      setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 3000)
    } catch (error) {
      setStatus('error')
      setMessage('Something went wrong. Try again.')
      console.error('Newsletter error:', error)
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <section className="px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <div className="text-center">
            <p className="font-display text-sm font-medium text-accent mb-4">
              [ STAY UPDATED ]
            </p>
            <h2 className="mb-4 font-display text-4xl font-normal tracking-[-0.04em] md:text-6xl">
              Get Ideas First
            </h2>
            <p className="mb-8 font-serif italic text-lg text-neutral-400">
              I write about AI, markets, and building. Delivered to your inbox, no fluff.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-black border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-accent transition-colors"
                required
              />
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-6 py-3 font-display font-semibold rounded-lg transition-all ${
                  status === 'success'
                    ? 'bg-green-600 text-white'
                    : status === 'error'
                      ? 'bg-red-600 text-white'
                      : 'bg-accent text-black hover:bg-accent/90'
                }`}
              >
                {status === 'loading' ? 'Subscribing...' : status === 'success' ? '✓ Subscribed' : 'Subscribe'}
              </motion.button>
            </div>
            {message && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-sm text-center ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}
              >
                {message}
              </motion.p>
            )}
          </form>
        </Reveal>

        <Reveal delay={0.2} className="mt-8">
          <p className="text-center text-xs text-neutral-500">
            No spam, unsubscribe anytime. I respect your inbox.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
