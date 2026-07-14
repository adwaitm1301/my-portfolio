'use client'

import { useRef, useState, useEffect, useCallback } from 'react'

const AUDIO_SRC = '/audio/track.mp3'
const TRACK_TITLE = 'GOOD_NIGHT.MP3'
const TRACK_ARTIST = 'FaSSounds'

// Classic Win95 3D bevel borders via box-shadow, done with CSS vars so
// the outer/inner edges read as "raised" or "sunken" like real Win95 chrome.
const raised = {
  border: '2px solid',
  borderColor: '#dfdfdf #0a0a0a #0a0a0a #dfdfdf',
  boxShadow: 'inset 1px 1px 0 #fff, inset -1px -1px 0 #808080',
}
const sunken = {
  border: '2px solid',
  borderColor: '#0a0a0a #dfdfdf #dfdfdf #0a0a0a',
  boxShadow: 'inset 1px 1px 0 #808080, inset -1px -1px 0 #fff',
}

export default function Win95Player() {
  const [minimized, setMinimized] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.3)
  const [needsInteraction, setNeedsInteraction] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const attemptPlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio
      .play()
      .then(() => {
        setPlaying(true)
        setNeedsInteraction(false)
      })
      .catch(() => {
        // Browser blocked autoplay-with-sound. Wait for first user gesture.
        setNeedsInteraction(true)
      })
  }, [])

  // Try to autoplay the instant the site loads.
  useEffect(() => {
    attemptPlay()
  }, [attemptPlay])

  // If blocked, start on the visitor's very first interaction anywhere on the page.
  useEffect(() => {
    if (!needsInteraction) return
    const startOnGesture = () => {
      attemptPlay()
    }
    window.addEventListener('click', startOnGesture, { once: true })
    window.addEventListener('keydown', startOnGesture, { once: true })
    window.addEventListener('touchstart', startOnGesture, { once: true })
    return () => {
      window.removeEventListener('click', startOnGesture)
      window.removeEventListener('keydown', startOnGesture)
      window.removeEventListener('touchstart', startOnGesture)
    }
  }, [needsInteraction, attemptPlay])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      attemptPlay()
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime)
  }
  const handleLoadedMetadata = () => {
    if (audioRef.current && !isNaN(audioRef.current.duration)) {
      setDuration(audioRef.current.duration)
    }
  }
  const handleCanPlay = () => {
    if (audioRef.current && !isNaN(audioRef.current.duration) && duration === 0) {
      setDuration(audioRef.current.duration)
    }
  }

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value)
    setCurrentTime(time)
    if (audioRef.current) audioRef.current.currentTime = time
  }

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value)
    setVolume(vol)
    if (audioRef.current) audioRef.current.volume = vol
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

      <div
        className="fixed right-6 bottom-6 z-50 w-72 select-none"
        style={{ fontFamily: '"Courier New", monospace' }}
      >
        <div style={{ ...raised, background: '#c0c0c0', padding: 2 }}>
          {/* Title bar */}
          <div
            className="flex items-center justify-between px-1.5 py-1"
            style={{
              background: 'linear-gradient(90deg, #003a8c 0%, #001b40 100%)',
            }}
          >
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-[13px]">🎵</span>
              <span className="truncate text-[11px] font-bold text-white tracking-wide">
                Winamp95 - {TRACK_TITLE}
              </span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                aria-label="Minimize"
                onClick={() => setMinimized((m) => !m)}
                className="flex h-[16px] w-[16px] items-center justify-center text-[10px] font-bold leading-none text-black"
                style={{ ...raised, background: '#c0c0c0' }}
              >
                {minimized ? '□' : '_'}
              </button>
            </div>
          </div>

          {minimized ? null : (
            <div className="p-2">
              {/* LCD Screen */}
              <div
                className="mb-2 p-2"
                style={{ ...sunken, background: '#0a1f0a' }}
              >
                <div
                  className="truncate text-[13px] font-bold tracking-wider"
                  style={{ color: '#00ff41', textShadow: '0 0 4px rgba(0,255,65,0.6)' }}
                >
                  {playing ? '▶ PLAYING' : needsInteraction ? '⏸ CLICK TO PLAY' : '⏸ PAUSED'}
                </div>
                <div
                  className="truncate text-[11px]"
                  style={{ color: '#00cc33' }}
                >
                  {TRACK_TITLE} — {TRACK_ARTIST}
                </div>
                <div
                  className="mt-1 text-right text-[11px] font-bold"
                  style={{ color: '#00ff41' }}
                >
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>

              {/* Progress bar - styled as a sunken groove with raised handle */}
              <div className="mb-2 px-0.5" style={{ ...sunken, background: '#808080', padding: '3px 4px' }}>
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleScrub}
                  className="w-full h-3 cursor-pointer appearance-none bg-transparent win95-slider"
                />
              </div>

              {/* Transport buttons */}
              <div className="mb-2 flex items-center justify-center gap-1">
                {[
                  { label: '◀◀', action: () => audioRef.current && (audioRef.current.currentTime = Math.max(currentTime - 5, 0)) },
                  { label: playing ? '❚❚' : '▶', action: togglePlay, primary: true },
                  { label: '▶▶', action: () => audioRef.current && (audioRef.current.currentTime = Math.min(currentTime + 5, duration)) },
                  { label: '■', action: () => { audioRef.current?.pause(); setPlaying(false); if (audioRef.current) audioRef.current.currentTime = 0 } },
                ].map((btn, i) => (
                  <button
                    key={i}
                    onClick={btn.action}
                    className="flex h-7 min-w-[36px] items-center justify-center px-2 text-[11px] font-bold text-black active:translate-y-px"
                    style={{ ...raised, background: btn.primary ? '#d4d0c8' : '#c0c0c0' }}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>

              {/* Volume */}
              <div className="flex items-center gap-2 px-0.5">
                <span className="text-[10px] font-bold text-black">VOL</span>
                <div className="flex-1" style={{ ...sunken, background: '#808080', padding: '3px 4px' }}>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={handleVolume}
                    className="w-full h-3 cursor-pointer appearance-none bg-transparent win95-slider"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        .win95-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 10px;
          height: 14px;
          background: #c0c0c0;
          border: 2px solid;
          border-color: #dfdfdf #0a0a0a #0a0a0a #dfdfdf;
          cursor: pointer;
        }
        .win95-slider::-moz-range-thumb {
          width: 10px;
          height: 14px;
          background: #c0c0c0;
          border: 2px solid;
          border-color: #dfdfdf #0a0a0a #0a0a0a #dfdfdf;
          cursor: pointer;
        }
        .win95-slider::-webkit-slider-runnable-track {
          height: 4px;
          background: transparent;
        }
      `}</style>
    </>
  )
}
