'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'

const DefaultCursorSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={24}
    viewBox="0 0 50 54"
    fill="none"
  >
    <g filter="url(#filter0_d_91_7928)">
      <path
        d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z"
        fill="black"
      />
      <path
        d="M43.7146 40.6933L28.5431 6.34306C27.3556 3.65428 23.5772 3.69516 22.3668 6.32755L6.57226 40.6778C5.3134 43.4156 7.97238 46.298 10.803 45.2549L24.7662 40.109C25.0221 40.0147 25.2999 40.0156 25.5494 40.1082L39.4193 45.254C42.2261 46.2953 44.9254 43.4347 43.7146 40.6933Z"
        stroke="white"
        strokeWidth={2.25825}
      />
    </g>
    <defs>
      <filter
        id="filter0_d_91_7928"
        x={0.602397}
        y={0.952444}
        width={49.0584}
        height={52.428}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={2.25825} />
        <feGaussianBlur stdDeviation={2.25825} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_91_7928"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_91_7928"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
)

const getDeviceType = () => {
  if (typeof window === 'undefined') return 'desktop'
  const userAgent = navigator.userAgent.toLowerCase()
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
  if (isMobile) {
    const isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(userAgent)
    return isTablet ? 'tablet' : 'mobile'
  }
  return 'desktop'
}

export default function CursorPet() {
  const [mounted, setMounted] = useState(false)
  const [deviceType, setDeviceType] = useState('desktop')
  const [isMoving, setIsMoving] = useState(false)

  const lastMousePos = useRef({ x: 0, y: 0 })
  const velocity = useRef({ x: 0, y: 0 })
  const lastUpdateTime = useRef(Date.now())
  const previousAngle = useRef(0)
  const accumulatedRotation = useRef(0)

  useEffect(() => {
    setDeviceType(getDeviceType())
    setMounted(true)
  }, [])

  const shouldHideCursor = deviceType === 'mobile' || deviceType === 'tablet'

  const positionSpringConfig = useMemo(
    () => ({ damping: 45, stiffness: 400, mass: 1, restDelta: 0.001 }),
    []
  )

  const cursorX = useSpring(
    typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    positionSpringConfig
  )
  const cursorY = useSpring(
    typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
    positionSpringConfig
  )
  const translateX = useSpring('-50%', positionSpringConfig)
  const translateY = useSpring('0%', positionSpringConfig)

  const rotation = useSpring(0, {
    ...positionSpringConfig,
    damping: 60,
    stiffness: 300,
  })
  const baseScale = useSpring(1, {
    ...positionSpringConfig,
    stiffness: 500,
    damping: 35,
  })
  const combinedScale = useTransform(baseScale, (value) => value * 1)

  // Inject CSS to hide browser cursor
  useEffect(() => {
    const cssId = 'smooth-cursor-css'
    let existingStyle = document.getElementById(cssId)
    if (!existingStyle) {
      existingStyle = document.createElement('style')
      existingStyle.id = cssId
      document.head.appendChild(existingStyle)
    }

    const css = `
      * { cursor: none !important; }
      input, textarea, select, [contenteditable="true"] {
        cursor: text !important;
      }
      button, button *, a, a *, [role="button"], [role="button"] *,
      [onclick], [onclick] *, .clickable, .clickable *,
      [data-clickable], [data-clickable] *,
      input[type="button"], input[type="submit"], input[type="reset"],
      label[for], label[for] * {
        cursor: pointer !important;
      }
    `
    existingStyle.innerHTML = css

    return () => {
      const styleElement = document.getElementById(cssId)
      if (styleElement) styleElement.remove()
    }
  }, [])

  // Main cursor tracking
  useEffect(() => {
    if (shouldHideCursor) return

    const updateVelocity = (currentPos: { x: number; y: number }) => {
      const currentTime = Date.now()
      const deltaTime = currentTime - lastUpdateTime.current
      if (deltaTime > 0) {
        velocity.current = {
          x: (currentPos.x - lastMousePos.current.x) / deltaTime,
          y: (currentPos.y - lastMousePos.current.y) / deltaTime,
        }
      }
      lastUpdateTime.current = currentTime
      lastMousePos.current = currentPos
    }

    const smoothMouseMove = (e: MouseEvent) => {
      const currentPos = { x: e.clientX, y: e.clientY }
      updateVelocity(currentPos)

      const speed = Math.sqrt(
        velocity.current.x * velocity.current.x +
          velocity.current.y * velocity.current.y
      )

      cursorX.set(currentPos.x)
      cursorY.set(currentPos.y)

      if (speed > 0.1) {
        const currentAngle =
          Math.atan2(velocity.current.y, velocity.current.x) * (180 / Math.PI) + 90

        let angleDiff = currentAngle - previousAngle.current
        if (angleDiff > 180) angleDiff -= 360
        if (angleDiff < -180) angleDiff += 360
        accumulatedRotation.current += angleDiff
        rotation.set(accumulatedRotation.current)
        previousAngle.current = currentAngle

        const normalizedAngle = ((currentAngle % 360) + 360) % 360

        if (normalizedAngle >= 315 || normalizedAngle < 45) {
          translateX.set('-50%')
          translateY.set('0%')
        } else if (normalizedAngle >= 45 && normalizedAngle < 135) {
          translateX.set('-100%')
          translateY.set('-50%')
        } else if (normalizedAngle >= 135 && normalizedAngle < 225) {
          translateX.set('-50%')
          translateY.set('-100%')
        } else {
          translateX.set('0%')
          translateY.set('-50%')
        }

        baseScale.set(0.95)
        setIsMoving(true)
        setTimeout(() => {
          baseScale.set(1)
          setIsMoving(false)
        }, 150)
      }
    }

    let rafId: number
    const throttledMouseMove = (e: MouseEvent) => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        smoothMouseMove(e)
        rafId = 0
      })
    }

    window.addEventListener('mousemove', throttledMouseMove)
    return () => {
      window.removeEventListener('mousemove', throttledMouseMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [
    cursorX,
    cursorY,
    rotation,
    baseScale,
    translateX,
    translateY,
    shouldHideCursor,
  ])

  // Render only after mount: the cursor position depends on window size,
  // which the server can't know — rendering during SSR causes a hydration mismatch.
  if (!mounted || shouldHideCursor) return null

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: cursorX,
        top: cursorY,
        translateX,
        translateY,
        rotate: rotation,
        scale: combinedScale,
        zIndex: 100,
        pointerEvents: 'none',
        willChange: 'transform',
      }}
    >
      <DefaultCursorSVG />
    </motion.div>
  )
}
