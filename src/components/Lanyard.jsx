import React, { useRef } from 'react'
import IDCard from './IDCard'
import { motion, useAnimation, useMotionValue, useSpring } from 'framer-motion'

const LANYARD_COLOR = '#880808'
const LANYARD_WIDTH = 52
const LANYARD_HEIGHT = 260
const CARD_WIDTH = 370

const svgWidth = CARD_WIDTH + 40
const centerStrapX = svgWidth / 2
const bottomY = LANYARD_HEIGHT - 10

const SPRING_CONFIG = { stiffness: 200, damping: 12, mass: 0.7 }

const Lanyard = () => {
  const angle = useMotionValue(0)
  const springAngle = useSpring(angle, SPRING_CONFIG)
  const isAnimating = useRef(false)

  const getStrapPath = (x, a) => {
    const curveAmount = Math.abs(a) * 1.2 + 30
    const controlX = x + curveAmount * Math.sign(a)
    return `M ${x} 0 Q ${controlX} ${bottomY / 2}, ${x} ${bottomY}`
  }

  const swing = async () => {
    if (isAnimating.current) return
    isAnimating.current = true
    angle.set(-30)
    setTimeout(() => angle.set(30), 120)
    setTimeout(() => angle.set(-18), 240)
    setTimeout(() => angle.set(18), 360)
    setTimeout(() => angle.set(0), 480)
    setTimeout(() => { isAnimating.current = false }, 600)
  }

  React.useEffect(() => {
    swing()
  }, [])

  const [currentAngle, setCurrentAngle] = React.useState(0)
  React.useEffect(() => {
    const unsubscribe = springAngle.on('change', setCurrentAngle)
    return unsubscribe
  }, [springAngle])

  // Handler to prevent swing on link button click
  const handleLinkClick = (e) => {
    e.stopPropagation()
  }

  // Only trigger swing if not clicking a link button
  const handleSwingClick = (e) => {
    // If the click target is inside a[data-link], do not swing
    if (e.target.closest('a[data-link]')) return
    swing()
  }

  return (
    <div className="flex flex-col items-center w-full px-2 sm:px-1 md:px-2" style={{ marginTop: 0 }}>
      <motion.div
        style={{ originY: 0, originX: 0.5, rotate: springAngle }}
        onClick={handleSwingClick}
        className="flex flex-col items-center cursor-pointer w-full"
      >
        <svg width={svgWidth} height={LANYARD_HEIGHT} style={{ marginTop: -180, maxWidth: '100%' }}>
          <path
            d={getStrapPath(centerStrapX, currentAngle)}
            stroke={LANYARD_COLOR}
            strokeWidth={LANYARD_WIDTH}
            fill="none"
            strokeLinecap="round"
          />
        </svg>
        <div className="-mt-2 w-full flex justify-center">
          <IDCard onLinkClick={handleLinkClick} />
        </div>
      </motion.div>
    </div>
  )
}

export default Lanyard