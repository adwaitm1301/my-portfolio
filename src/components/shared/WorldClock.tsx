'use client'

import { useState, useEffect, useMemo, startTransition } from 'react'

function getTimeString(timezone: string, hour12: boolean, showMinutes: boolean, showSeconds: boolean): string {
  try {
    const opts: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      hour12,
      timeZone: timezone,
    }
    if (showMinutes) opts.minute = '2-digit'
    if (showMinutes && showSeconds) opts.second = '2-digit'
    return new Intl.DateTimeFormat('en-US', opts).format(new Date())
  } catch {
    return '--:--'
  }
}

interface WorldClockProps {
  hour12?: boolean
  showMinutes?: boolean
  showSeconds?: boolean
  showLabel?: boolean
  customLabel?: string
  separator?: string
  color?: string
  labelColor?: string
  className?: string
  style?: React.CSSProperties
}

export default function WorldClock({
  hour12 = false,
  showMinutes = true,
  showSeconds = true,
  showLabel = true,
  customLabel = '',
  separator = '  ·  ',
  color = '#ffffff',
  labelColor = '#666666',
  className = '',
  style,
}: WorldClockProps) {
  const [isClient, setIsClient] = useState(false)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const [detectedTimezone, setDetectedTimezone] = useState('')
  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
      startTransition(() => setDetectedTimezone(tz))
    } catch {
      startTransition(() => setDetectedTimezone('UTC'))
    }
  }, [])

  const activeTimezone = detectedTimezone || 'UTC'

  useEffect(() => {
    if (!isClient) return
    const id = setInterval(() => startTransition(() => setTick((n) => n + 1)), 1000)
    return () => clearInterval(id)
  }, [isClient])

  const displayString = useMemo(() => {
    if (!isClient) return '--:--'
    if (!detectedTimezone) return '--:--'
    return getTimeString(activeTimezone, hour12, showMinutes, showSeconds)
  }, [isClient, detectedTimezone, activeTimezone, hour12, showMinutes, showSeconds, tick])

  const autoLabel = useMemo(() => {
    if (!detectedTimezone) return 'Detecting...'
    return detectedTimezone.split('/').pop()?.replace(/_/g, ' ') ?? detectedTimezone
  }, [detectedTimezone])

  const labelText = customLabel || autoLabel

  return (
    <div
      className={`flex items-center gap-2 ${className}`}
      style={{
        fontVariantNumeric: 'tabular-nums',
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      <span
        style={{
          color,
          fontSize: 'inherit',
          fontWeight: 500,
          letterSpacing: 'inherit',
          lineHeight: 'inherit',
          fontFamily: 'inherit',
        }}
      >
        {displayString}
      </span>
      {showLabel && (
        <>
          {separator && (
            <span
              style={{
                color: labelColor,
                fontSize: '0.65em',
                fontWeight: 500,
                letterSpacing: '-0.01em',
                lineHeight: '1em',
                fontFamily: 'var(--font-funnel), sans-serif',
                verticalAlign: 'middle',
              }}
            >
              {separator}
            </span>
          )}
          <span
            style={{
              color: labelColor,
              fontSize: '0.45em',
              fontWeight: 500,
              letterSpacing: '-0.01em',
              lineHeight: '1em',
              fontFamily: 'var(--font-funnel), sans-serif',
              verticalAlign: 'middle',
            }}
          >
            {labelText}
          </span>
        </>
      )}
    </div>
  )
}
