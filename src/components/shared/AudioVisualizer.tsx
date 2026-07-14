'use client'

import { useEffect, useRef, useState } from 'react'

export default function AudioVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const dataArrayRef = useRef<Uint8Array | null>(null)
  const animationIdRef = useRef<number | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Find the audio element in the document
    const audioElement = document.querySelector('audio') as HTMLAudioElement | null
    if (!audioElement) return

    // Setup Web Audio API
    if (!audioContextRef.current) {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
        const source = audioContext.createMediaElementAudioSource(audioElement)
        const analyser = audioContext.createAnalyser()

        analyser.fftSize = 256
        const bufferLength = analyser.frequencyBinCount
        const dataArray = new Uint8Array(bufferLength)

        source.connect(analyser)
        analyser.connect(audioContext.destination)

        audioContextRef.current = audioContext
        analyserRef.current = analyser
        dataArrayRef.current = dataArray
      } catch (e) {
        console.log('Web Audio API not available')
        return
      }
    }

    const analyser = analyserRef.current
    const dataArray = dataArrayRef.current

    if (!analyser || !dataArray) return

    const barCount = 64
    const barWidth = canvas.width / barCount
    const barGap = 2

    const draw = () => {
      analyser.getByteFrequencyData(dataArray)

      // Clear canvas with semi-transparent black (trail effect)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw bars
      for (let i = 0; i < barCount; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height

        // Neon green gradient: #00ff41 (bright) to #00aa22 (darker)
        const gradient = ctx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height)
        gradient.addColorStop(0, '#00ff41')
        gradient.addColorStop(0.5, '#00dd33')
        gradient.addColorStop(1, '#00aa22')

        ctx.fillStyle = gradient
        ctx.fillRect(
          i * barWidth + barGap / 2,
          canvas.height - barHeight,
          barWidth - barGap,
          barHeight
        )

        // Glow effect for each bar
        ctx.shadowColor = 'rgba(0, 255, 65, 0.6)'
        ctx.shadowBlur = 8
        ctx.shadowOffsetX = 0
        ctx.shadowOffsetY = 0
      }

      animationIdRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
    }
  }, [mounted])

  if (!mounted) return null

  return (
    <>
      <audio
        src="/audio/track.mp3"
        loop
        preload="metadata"
        autoPlay
        style={{ display: 'none' }}
      />
      <canvas
        ref={canvasRef}
        width={400}
        height={80}
        className="fixed right-4 z-40 rounded-lg"
        style={{
          top: 'calc(50% + 120px)',
          background: 'rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(0, 255, 65, 0.2)',
          backdropFilter: 'blur(8px)',
        }}
      />
    </>
  )
}
