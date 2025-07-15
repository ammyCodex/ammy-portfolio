import React, { useEffect, useRef, useState } from 'react'

const isMobile = typeof window !== 'undefined' && (window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

const MatrixRain = ({ onClose }) => {
  const canvasRef = useRef(null)
  const [showLoader, setShowLoader] = useState(true)

  // Loader key handling
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (showLoader) {
        if (e.key === 'Enter') {
          setShowLoader(false)
        }
        if (e.key === 'Escape') {
          e.preventDefault()
          e.stopPropagation()
          onClose()
        }
      } else {
        if (e.key === 'Escape') {
          e.preventDefault()
          e.stopPropagation()
          onClose()
        }
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [showLoader, onClose])

  // Animation/canvas setup only after loader is dismissed
  useEffect(() => {
    if (!showLoader) {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      // Set canvas size
      const resizeCanvas = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
      resizeCanvas()
      window.addEventListener('resize', resizeCanvas)
      // Matrix rain characters
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?'
      const charArray = chars.split('')
      // Rain drops
      const drops = []
      const fontSize = 14
      const columns = Math.floor(canvas.width / fontSize)
      // Initialize drops
      for (let i = 0; i < columns; i++) {
        drops[i] = 1
      }
      // Animation loop
      const draw = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = '#ff2222'
        ctx.font = `${fontSize}px monospace`
        for (let i = 0; i < drops.length; i++) {
          const char = charArray[Math.floor(Math.random() * charArray.length)]
          ctx.fillText(char, i * fontSize, drops[i] * fontSize)
          drops[i]++
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0
          }
        }
      }
      const interval = setInterval(draw, 50)
      return () => {
        clearInterval(interval)
        window.removeEventListener('resize', resizeCanvas)
      }
    }
  }, [showLoader])

  if (showLoader) {
    return (
      <div
        className="matrix-rain-container flex items-center justify-center min-h-screen"
        onTouchStart={() => isMobile && setShowLoader(false)}
        onClick={() => isMobile && setShowLoader(false)}
        style={{ touchAction: 'manipulation' }}
      >
        <div className="matrix-loader text-red-400 text-lg font-bold text-center p-8">
          <div className="loading-spinner mb-4">
            <span className="spinner-char">⠋</span>
            <span className="spinner-char">⠙</span>
            <span className="spinner-char">⠹</span>
            <span className="spinner-char">⠸</span>
            <span className="spinner-char">⠼</span>
            <span className="spinner-char">⠴</span>
            <span className="spinner-char">⠦</span>
            <span className="spinner-char">⠧</span>
            <span className="spinner-char">⠇</span>
            <span className="spinner-char">⠏</span>
          </div>
          <div className="mb-2">💻 MATRIX RAIN - INITIALIZING</div>
          <div className="text-red-300 text-sm">
            Press <b>Enter</b> to start simulation<br/>
            Press <b>ESC</b> to exit
          </div>
          {isMobile && (
            <>
              {/* Removed buttons, only show tap message */}
              <div className="text-xs text-red-300 mt-2">Tap anywhere to start</div>
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="matrix-rain-container">
      <div className="matrix-header">
        <div className="text-red-400 text-lg font-bold mb-2">
          💻 MATRIX RAIN - SIMULATION ACTIVE
        </div>
        <div className="text-red-300 text-sm">
          Press ESC to exit matrix mode
        </div>
        {isMobile && (
          <div style={{ marginTop: 12, display: 'flex', justifyContent: 'center' }}>
            <button className="terminal-btn red" onClick={onClose}>Exit</button>
          </div>
        )}
      </div>
      <canvas
        ref={canvasRef}
        className="matrix-canvas"
        style={{
          background: '#000',
          display: 'block',
          width: '100%',
          height: 'calc(100vh - 100px)'
        }}
      />
    </div>
  )
}

export default MatrixRain 