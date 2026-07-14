'use client'

import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const AUDIO_SRC = '/audio/track.mp3'
const TRACK_TITLE = 'Good Night'
const TRACK_ARTIST = 'FaSSounds'

export default function IPodPlayer() {
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.3)
  const audioRef = useRef<HTMLAudioElement>(null)
  const wheelRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState(0)

  const togglePlay = () => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
    } else {
      audioRef.current.play().catch(err => {
        console.log('Autoplay blocked:', err)
        setPlaying(false)
      })
      setPlaying(true)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      const dur = audioRef.current.duration
      if (dur && !isNaN(dur)) {
        setDuration(dur)
      }
    }
  }

  const handleCanPlay = () => {
    if (audioRef.current) {
      const dur = audioRef.current.duration
      if (dur && !isNaN(dur) && duration === 0) {
        setDuration(dur)
      }
    }
  }

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleNextTrack = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(currentTime + 5, duration)
    }
  }

  const handlePrevTrack = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(currentTime - 5, 0)
    }
  }

  const handleWheelRotate = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = wheelRef.current?.getBoundingClientRect()
    if (!rect) return

    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI)
    setRotation(angle)

    // Scrub based on wheel rotation (0-360 maps to 0-duration)
    const progress = ((angle + 90) % 360) / 360
    if (audioRef.current) {
      audioRef.current.currentTime = progress * duration
    }
  }

  const progress = duration ? (currentTime / duration) * 100 : 0

  return (
    <>
      <audio
        ref={audioRef}
        src={AUDIO_SRC}
        loop
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onCanPlay={handleCanPlay}
      />
      <div className="fixed right-6 bottom-6 z-50 w-64">
      {/* Outer metal casing */}
      <div className="bg-gradient-to-b from-gray-100 via-gray-50 to-gray-200 rounded-3xl p-4 shadow-2xl border border-gray-300" style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.8)' }}>
        {/* Screen area */}
        <div className="bg-gradient-to-b from-gray-900 to-black rounded-2xl p-4 mb-6 border border-gray-800">
          {/* LCD Display */}
          <div className="bg-blue-950 rounded-lg p-3 mb-2 text-center font-mono text-xs text-blue-300" style={{ textShadow: '0 0 10px rgba(59,130,246,0.5)' }}>
            <div className="font-bold text-sm mb-1 truncate">{TRACK_TITLE}</div>
            <div className="text-xs opacity-80 truncate mb-2">{TRACK_ARTIST}</div>
            <div className="text-blue-400 font-bold">{formatTime(currentTime)} / {formatTime(duration)}</div>
          </div>

          {/* Progress bar */}
          <div className="bg-gray-800 rounded-full h-1.5 overflow-hidden mb-2">
            <motion.div
              className="bg-gradient-to-r from-blue-400 to-blue-500 h-full"
              style={{ width: `${progress}%` }}
              transition={{ type: 'tween', duration: 0.1 }}
            />
          </div>
        </div>

        {/* Scroll wheel */}
        <div className="flex justify-center mb-6">
          <motion.div
            ref={wheelRef}
            onPointerMove={handleWheelRotate}
            animate={{ rotate: rotation }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="w-48 h-48 rounded-full bg-gradient-to-br from-gray-300 via-gray-200 to-gray-400 flex items-center justify-center cursor-grab active:cursor-grabbing shadow-inner border-4 border-gray-500"
            style={{ boxShadow: 'inset 0 4px 10px rgba(0,0,0,0.3), inset 0 -4px 10px rgba(255,255,255,0.5)' }}
          >
            {/* Wheel segments */}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-8 bg-gray-600 rounded-full"
                style={{
                  transform: `rotate(${(i * 30)}deg) translateY(-80px)`,
                }}
              />
            ))}

            {/* Center circle */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center shadow-inner border-2 border-gray-700">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-gray-900" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Control buttons */}
        <div className="flex justify-between items-center gap-3 mb-4">
          {/* Previous */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handlePrevTrack}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-black font-bold text-lg shadow-md hover:shadow-lg transition-shadow border border-gray-400"
            style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.5)' }}
          >
            ⏮
          </motion.button>

          {/* Play/Pause - Center button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={togglePlay}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 flex items-center justify-center text-black font-bold text-2xl shadow-lg hover:shadow-xl transition-shadow border-2 border-gray-500"
            style={{ boxShadow: '0 6px 16px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.6)' }}
          >
            {playing ? '⏸' : '▶'}
          </motion.button>

          {/* Next */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleNextTrack}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-black font-bold text-lg shadow-md hover:shadow-lg transition-shadow border border-gray-400"
            style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.5)' }}
          >
            ⏭
          </motion.button>
        </div>

        {/* Volume control */}
        <div className="px-2">
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => {
              const vol = parseFloat(e.target.value)
              setVolume(vol)
              if (audioRef.current) {
                audioRef.current.volume = vol
              }
            }}
            className="w-full h-1 bg-gray-700 rounded-full appearance-none cursor-pointer accent-blue-400"
          />
          <div className="text-xs text-gray-500 text-center mt-1">Volume</div>
        </div>

        {/* Brand text */}
        <div className="text-center text-xs text-gray-700 font-semibold mt-3 tracking-widest">
          iPod
        </div>
      </div>
      </div>
    </>
  )
}
