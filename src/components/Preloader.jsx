import React, { useEffect, useState, useRef } from 'react'

const bootLines = [
  'Booting up Ammy Terminal Portfolio...\n',
  '[ OK ] Initializing system modules',
  '[ OK ] Loading AI Developer profile',
  '[ OK ] Mounting projects and skills',
  '[ OK ] Starting terminal interface',
  '',
  'Welcome, Ammy!'
]

function useTypewriter(lines, delay = 32, lineDelay = 350) {
  const [displayed, setDisplayed] = useState([])

  useEffect(() => {
    let mounted = true
    let currentLine = 0
    let currentChar = 0
    let acc = []

    function typeNextChar() {
      if (!mounted) return
      if (currentLine >= lines.length) return
      if (!acc[currentLine]) acc[currentLine] = ''
      acc[currentLine] += lines[currentLine][currentChar] || ''
      setDisplayed([...acc])
      currentChar++
      if (currentChar < lines[currentLine].length) {
        setTimeout(typeNextChar, delay)
      } else {
        currentLine++
        currentChar = 0
        if (currentLine < lines.length) {
          setTimeout(() => {
            acc[currentLine] = ''
            setDisplayed([...acc])
            setTimeout(typeNextChar, lineDelay)
          }, lineDelay)
        }
      }
    }
    setDisplayed([])
    setTimeout(typeNextChar, 600)
    return () => { mounted = false }
  }, [lines, delay, lineDelay])

  return displayed
}

export default function Preloader() {
  const [logoVisible, setLogoVisible] = useState(false)
  const displayedLines = useTypewriter(bootLines, 22, 350)
  const [tildeOffset, setTildeOffset] = useState(0)
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  // Responsive detection
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 600;

  // Animate logo in
  useEffect(() => {
    const logoTimer = setTimeout(() => setLogoVisible(true), 300)
    return () => clearTimeout(logoTimer)
  }, [])

  // Animate tilde pattern movement (no longer used, but keep for future)
  useEffect(() => {
    let raf
    let start = Date.now()
    function animate() {
      setTildeOffset(((Date.now() - start) / 32) % 36)
      raf = requestAnimationFrame(animate)
    }
    animate()
    return () => raf && cancelAnimationFrame(raf)
  }, [])

  // Tilt effect
  useEffect(() => {
    const handleMove = (e) => {
      const card = cardRef.current
      if (!card) return
      const rect = card.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      setTilt({
        x: (x - 0.5) * 18, // max 9deg left/right
        y: (y - 0.5) * -18 // max 9deg up/down
      })
    }
    const handleLeave = () => setTilt({ x: 0, y: 0 })
    const card = cardRef.current
    if (card) {
      card.addEventListener('mousemove', handleMove)
      card.addEventListener('mouseleave', handleLeave)
    }
    return () => {
      if (card) {
        card.removeEventListener('mousemove', handleMove)
        card.removeEventListener('mouseleave', handleLeave)
      }
    }
  }, [])

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: '#0A0A0A',
      color: '#FFF9E5',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'JetBrains Mono, Fira Code, monospace',
      fontSize: isMobile ? 14 : 18,
      letterSpacing: 1,
      flexDirection: 'column',
      transition: 'opacity 0.5s',
      overflow: 'hidden',
    }}>
      <div
        ref={cardRef}
        style={{
          position: 'relative',
          borderRadius: isMobile ? 10 : 18,
          padding: isMobile ? '18px 8px' : '32px 28px',
          minWidth: isMobile ? 0 : 320,
          width: isMobile ? '95vw' : undefined,
          maxWidth: isMobile ? '98vw' : '90vw',
          border: '1.5px solid #880808',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          overflow: 'hidden',
          background: 'rgba(10,10,10,0.55)',
          boxShadow: '0 4px 32px #0008',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          transform: `perspective(900px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
          transition: 'transform 0.18s cubic-bezier(.4,2,.6,1)',
        }}
      >
        {/* Logo animation */}
        <div
          style={{
            width: isMobile ? 40 : 64,
            height: isMobile ? 40 : 64,
            background: '#880808',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: isMobile ? 12 : 24,
            opacity: logoVisible ? 1 : 0,
            transform: logoVisible ? 'scale(1)' : 'scale(0.7)',
            transition: 'opacity 0.6s cubic-bezier(.4,2,.6,1), transform 0.7s cubic-bezier(.4,2,.6,1)',
            boxShadow: '0 2px 8px #0002',
            zIndex: 1,
          }}
        >
          <img
            src="/logo.png"
            alt="Logo"
            style={{
              width: '70%',
              height: '70%',
              objectFit: 'contain',
              borderRadius: '50%',
              background: '#880808',
              display: 'block',
            }}
          />
        </div>
        {/* Boot lines typewriter animation */}
        <div style={{ width: '100%', zIndex: 1 }}>
          {bootLines.map((line, i) => (
            <div
              key={i}
              style={{
                color: '#FFF9E5',
                fontWeight: line.startsWith('Welcome') ? 700 : 400,
                marginBottom: isMobile ? 1 : 2,
                fontSize: line.startsWith('Welcome') ? (isMobile ? 16 : 22) : (isMobile ? 12 : 16),
                letterSpacing: 1,
                fontFamily: 'inherit',
                opacity: 1,
                animation: `preloader-fadein 0.5s ${i * 0.32 + 0.2}s both`,
                minHeight: line.startsWith('Welcome') ? (isMobile ? 20 : 28) : (isMobile ? 14 : 20),
                whiteSpace: 'pre',
              }}
            >
              {displayedLines[i] ? (
                line.startsWith('[ OK ]') ? <span style={{ color: '#880808' }}>{displayedLines[i]}</span> : displayedLines[i]
              ) : ''}
            </div>
          ))}
          {/* Blinking cursor after last line */}
          {displayedLines.length === bootLines.length && (
            <div className="terminal-cursor" style={{ display: 'inline-block', width: isMobile ? 8 : 10, height: isMobile ? 14 : 20, background: '#880808', marginLeft: 6, animation: 'blink 1s infinite' }}></div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes preloader-fadein {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  )
} 