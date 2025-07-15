import React, { useRef } from 'react'
import IDCard from './IDCard'
import { motion, useAnimation, useMotionValue, useSpring } from 'framer-motion'

const LANYARD_COLOR = '#880808'
const LANYARD_WIDTH = 52
const BASE_LANYARD_HEIGHT = 240
const BASE_MARGIN_TOP = -180
const CARD_WIDTH = 370

const svgWidth = CARD_WIDTH + 40
const centerStrapX = svgWidth / 2

const SPRING_CONFIG = { stiffness: 200, damping: 12, mass: 0.7 }

const Lanyard = () => {
  const [lanyardHeight, setLanyardHeight] = React.useState(BASE_LANYARD_HEIGHT)
  const [marginTop, setMarginTop] = React.useState(BASE_MARGIN_TOP)

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setLanyardHeight(BASE_LANYARD_HEIGHT * 1.2)
        setMarginTop(BASE_MARGIN_TOP * 1.2)
      } else {
        setLanyardHeight(BASE_LANYARD_HEIGHT)
        setMarginTop(BASE_MARGIN_TOP)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const bottomY = lanyardHeight - 10
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
  const curveAmount = Math.abs(currentAngle) * 1.2 + 30
  const controlX = centerStrapX + curveAmount * Math.sign(currentAngle)
  const textPositions = [0.89]
  const nameLetters = 'AMMY'.split('')

  return (
    <div className="flex flex-col items-center w-full px-2 sm:px-1 md:px-2" style={{ marginTop: 0 }}>
      <motion.div
        style={{ originY: 0, originX: 0.5, rotate: springAngle }}
        onClick={handleSwingClick}
        className="flex flex-col items-center cursor-pointer w-full"
      >
        <svg width={svgWidth} height={lanyardHeight} style={{ marginTop, maxWidth: '100%' }}>
          <path
            d={getStrapPath(centerStrapX, currentAngle)}
            stroke={LANYARD_COLOR}
            strokeWidth={LANYARD_WIDTH}
            fill="none"
            strokeLinecap="round"
          />
          {textPositions.map((pos, posIndex) => (
            <g key={posIndex}>
              {nameLetters.map((letter, letterIndex) => {
                const t = pos - (letterIndex * 0.06);
                const textX = Math.pow(1 - t, 2) * centerStrapX + 2 * t * (1 - t) * controlX + Math.pow(t, 2) * centerStrapX;
                const textY = t * bottomY;
                const angle = Math.atan2(textY - (t + 0.01) * bottomY, textX - (Math.pow(1 - (t + 0.01), 2) * centerStrapX + 2 * (t + 0.01) * (1 - (t + 0.01)) * controlX + Math.pow(t + 0.01, 2) * centerStrapX)) * (180 / Math.PI);
                return (
                  <text
                    key={letterIndex}
                    x={textX}
                    y={textY}
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    fontSize="22"
                    fontWeight="900"
                    fill="#0A0A0A"
                    // fontFamily="Miniver, cursive"
                    transform={`rotate(${angle}, ${textX}, ${textY})`}
                    className="lanyard-name-text"
                    style={{
                      filter: 'drop-shadow(0 1px 2px #2228)',
                      userSelect: 'none',
                    }}
                  >
                    {letter}
                  </text>
                );
              })}
            </g>
          ))}
        </svg>
        <div className="-mt-2 w-full flex justify-center">
          <IDCard onLinkClick={handleLinkClick} />
        </div>
      </motion.div>
    </div>
  )
}

export default Lanyard