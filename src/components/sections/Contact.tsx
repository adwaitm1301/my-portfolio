'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from '@/components/shared/Reveal'

interface Message {
  id: string
  type: 'bot' | 'user'
  text: string
  timestamp: number
}

export default function Contact() {
  const [messages, setMessages] = useState<Message[]>([])
  const [userInput, setUserInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [stage, setStage] = useState<'greeting' | 'name' | 'email' | 'message' | 'success'>('greeting')
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll chat container to latest message
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
    }
  }, [messages])

  // Initialize chat
  useEffect(() => {
    if (messages.length === 0) {
      setTimeout(() => {
        addBotMessage('Hey there! 👋 I\'m here to help. What\'s your name?')
        setStage('name')
      }, 500)
    }
  }, [])

  const addBotMessage = (text: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        type: 'bot',
        text,
        timestamp: Date.now(),
      },
    ])
  }

  const addUserMessage = (text: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: (Date.now() + 1).toString(),
        type: 'user',
        text,
        timestamp: Date.now(),
      },
    ])
  }

  const validateName = (name: string): boolean => {
    return name.trim().length >= 2 && !/[^a-zA-Z\s'-]/.test(name)
  }

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const validateMessage = (message: string): boolean => {
    return message.trim().length >= 10
  }

  const handleSubmitChat = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userInput.trim()) return

    const input = userInput.trim()
    setUserInput('')
    addUserMessage(input)
    setIsLoading(true)

    // Handle different stages
    if (stage === 'name') {
      if (!validateName(input)) {
        setTimeout(() => {
          addBotMessage('Please enter a valid name (at least 2 characters, letters only).')
          setIsLoading(false)
        }, 400)
        return
      }
      setFormData((prev) => ({ ...prev, name: input }))
      setStage('email')
      setTimeout(() => {
        addBotMessage('Thanks! What\'s your email address?')
        setIsLoading(false)
      }, 600)
    } else if (stage === 'email') {
      if (!validateEmail(input)) {
        setTimeout(() => {
          addBotMessage('That doesn\'t look like a valid email. Please enter a valid email address.')
          setIsLoading(false)
        }, 400)
        return
      }
      setFormData((prev) => ({ ...prev, email: input }))
      setStage('message')
      setTimeout(() => {
        addBotMessage('Got it! Now, what\'s your message or query for me? (at least 10 characters)')
        setIsLoading(false)
      }, 600)
    } else if (stage === 'message') {
      if (!validateMessage(input)) {
        setTimeout(() => {
          addBotMessage('Please enter a message with at least 10 characters.')
          setIsLoading(false)
        }, 400)
        return
      }
      setFormData((prev) => ({ ...prev, message: input }))
      setIsLoading(false)

      // Submit form to Formspree
      setTimeout(async () => {
        setIsLoading(true)
        const formDataObj = new FormData()
        formDataObj.append('name', formData.name)
        formDataObj.append('email', formData.email)
        formDataObj.append('message', input)

        try {
          const response = await fetch('https://formspree.io/f/xvzeodoo', {
            method: 'POST',
            headers: { Accept: 'application/json' },
            body: formDataObj,
          })

          if (response.ok) {
            setSubmitted(true)
            setStage('success')
            addBotMessage('✅ Perfect! Your message has been submitted successfully. I\'ll get back to you soon!')
          } else {
            addBotMessage('Something went wrong. Please try again later.')
          }
        } catch (error) {
          console.error('Form submission error:', error)
          addBotMessage('Something went wrong. Please try again later.')
        }
        setIsLoading(false)
      }, 600)
    }
  }

  return (
    <section className="px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <h2 className="mb-4 font-display text-5xl font-normal tracking-[-0.04em] md:text-7xl">
            Let's Talk
          </h2>
          <p className="mb-16 font-serif italic text-lg text-neutral-400">
            Have a question or want to collaborate? Drop me a message.
          </p>
        </Reveal>

        {/* Chat Container */}
        <Reveal delay={0.1}>
          <div
            className="relative rounded-2xl overflow-hidden backdrop-blur-xl p-6 md:p-8 min-h-96 flex flex-col"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.01) 100%)',
              border: '1px solid rgba(255,255,255,0.15)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255,255,255,0.2)',
            }}
          >
            {/* Messages */}
            <div ref={messagesContainerRef} className="flex-1 overflow-y-auto mb-6 space-y-4 min-h-64 scroll-smooth pr-2">
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-3 rounded-2xl text-sm leading-relaxed backdrop-blur-sm ${
                        msg.type === 'user'
                          ? 'bg-accent/20 border border-accent/40 text-white rounded-br-none'
                          : 'bg-neutral-800/40 border border-neutral-700/40 text-neutral-200 rounded-bl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2 justify-start"
                >
                  <div className="bg-neutral-800/40 px-4 py-3 rounded-2xl rounded-bl-none flex gap-2">
                    <div className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            {!submitted ? (
              <form onSubmit={handleSubmitChat} className="flex gap-3">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder={
                    stage === 'name' ? 'Your name...' :
                    stage === 'email' ? 'your@email.com' :
                    stage === 'message' ? 'Your message...' :
                    'Type here...'
                  }
                  disabled={isLoading || submitted}
                  className="flex-1 bg-neutral-900/50 border border-neutral-700/50 rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-accent/50 transition-colors disabled:opacity-50"
                  autoComplete="off"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={isLoading || !userInput.trim()}
                  className="bg-accent hover:bg-accent/90 disabled:opacity-50 text-black font-semibold px-6 py-3 rounded-lg transition-all"
                >
                  Send
                </motion.button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-6"
              >
                <p className="text-accent font-semibold mb-4">Thanks for reaching out! 🙌</p>
                <p className="text-neutral-400 text-sm">
                  I'll review your message and get back to you within 24 hours.
                </p>
              </motion.div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
