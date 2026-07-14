'use client'

import { useRef, useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const AUDIO_SRC = '/audio/track.mp3'
const TRACK_TITLE = 'Good Night'
const TRACK_ARTIST = 'FaSSounds'

export default function MusicPlayer() {
  const [expanded, setExpanded] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.3)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Handle play/pause
  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch((err) => {
          console.log('Autoplay blocked or audio not available:', err)
          setPlaying(false)
        })
    }
  }

  // Update current time
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  // Update duration when loaded
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      const dur = audioRef.current.duration
      if (dur && !isNaN(dur)) {
        setDuration(dur)
      }
    }
  }

  // Also update duration when audio can play
  const handleCanPlay = () => {
    if (audioRef.current) {
      const dur = audioRef.current.duration
      if (dur && !isNaN(dur) && duration === 0) {
        setDuration(dur)
      }
    }
  }

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value)
    setVolume(vol)
    if (audioRef.current) {
      audioRef.current.volume = vol
    }
  }

  // Handle progress bar scrub
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value)
    setCurrentTime(time)
    if (audioRef.current) {
      audioRef.current.currentTime = time
    }
  }

  // Format time MM:SS
  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="fixed right-4 top-1/2 z-50 -translate-y-1/2">
      <audio
        ref={audioRef}
        src={AUDIO_SRC}
        loop
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onCanPlay={handleCanPlay}
        onEnded={() => {
          // Auto-restart if at end (due to loop attribute, this may not trigger)
          if (audioRef.current) {
            audioRef.current.currentTime = 0
            audioRef.current.play()
          }
        }}
      />

      <AnimatePresence mode="wait">
        {expanded ? (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, x: 30, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 30, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 32 }}
            className="w-72 space-y-4 rounded-2xl border border-neutral-800 bg-black/95 p-4 backdrop-blur-md"
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <p className="truncate text-sm font-semibold leading-tight text-white">
                  {TRACK_TITLE}
                </p>
                <p className="truncate text-xs uppercase tracking-[0.08em] text-white/60">
                  {TRACK_ARTIST}
                </p>
              </div>
              <button
                aria-label="Minimize Player"
                onClick={() => setExpanded(false)}
                className="shrink-0 p-1 text-neutral-500 transition-colors hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Play/Pause Button */}
            <button
              aria-label={playing ? 'Pause' : 'Play'}
              onClick={togglePlay}
              className="flex h-12 w-12 items-center justify-center rounded-full border-none bg-accent text-black transition-transform hover:scale-110"
            >
              {playing ? (
                <span className="text-lg font-bold">❚❚</span>
              ) : (
                <span className="ml-0.5 text-lg font-bold">▶</span>
              )}
            </button>

            {/* Progress Bar */}
            <div className="space-y-1">
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleProgressChange}
                className="h-1 w-full cursor-pointer appearance-none rounded-full bg-neutral-800 accent-accent"
              />
              <div className="flex justify-between text-xs text-neutral-400">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Volume Control */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.08em] text-neutral-500">
                Volume
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={handleVolumeChange}
                className="h-1 w-full cursor-pointer appearance-none rounded-full bg-neutral-800 accent-accent"
              />
            </div>

            {/* Status */}
            <p className="text-xs text-center text-neutral-500">
              {playing ? 'Now Playing' : 'Paused'}
            </p>
          </motion.div>
        ) : (
          <motion.button
            key="collapsed"
            aria-label="Expand Player"
            onClick={() => setExpanded(true)}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ type: 'spring', stiffness: 400, damping: 32 }}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-700 bg-black/80 text-white backdrop-blur-md transition-all hover:border-accent hover:text-accent hover:scale-110"
            title={playing ? 'Music Playing' : 'Click to expand'}
          >
            <span className="text-lg">{playing ? '♪' : '♫'}</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
