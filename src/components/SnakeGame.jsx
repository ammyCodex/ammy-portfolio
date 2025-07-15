import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useMediaQuery } from 'react-responsive';

const BOARD_WIDTH = 30
const BOARD_HEIGHT = 20
const INITIAL_SNAKE = [{ x: 15, y: 10 }]
const INITIAL_DIRECTION = { x: 1, y: 0 }
const GAME_SPEED = 150

const SnakeGame = ({ onClose }) => {
  const [snake, setSnake] = useState(INITIAL_SNAKE)
  const [direction, setDirection] = useState(INITIAL_DIRECTION)
  const [food, setFood] = useState({ x: 5, y: 5 })
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [showInstructions, setShowInstructions] = useState(true)
  const [flashGameOver, setFlashGameOver] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)
  const [showLoader, setShowLoader] = useState(true)

  // Generate random food position
  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * BOARD_WIDTH),
      y: Math.floor(Math.random() * BOARD_HEIGHT)
    }
    // Make sure food doesn't spawn on snake
    if (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
      return generateFood()
    }
    return newFood
  }, [snake])

  // Check collision
  const checkCollision = useCallback((head) => {
    // Wall collision
    if (head.x < 0 || head.x >= BOARD_WIDTH || head.y < 0 || head.y >= BOARD_HEIGHT) {
      return true
    }
    // Self collision
    return snake.some(segment => segment.x === head.x && segment.y === head.y)
  }, [snake])

  // Move snake
  const moveSnake = useCallback(() => {
    if (gameOver || isPaused) return

    setSnake(prevSnake => {
      const newSnake = [...prevSnake]
      const head = { ...newSnake[0] }
      
      // Move head
      head.x += direction.x
      head.y += direction.y

      // Check collision
      if (checkCollision(head)) {
        setGameOver(true)
        return prevSnake
      }

      newSnake.unshift(head)

      // Check if food is eaten
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 10)
        setFood(generateFood())
      } else {
        newSnake.pop()
      }

      return newSnake
    })
  }, [direction, food, gameOver, isPaused, checkCollision, generateFood])

  // Handle key presses
  const handleKeyPress = useCallback((e) => {
    // Prevent event from bubbling up to terminal
    e.stopPropagation()

    if (showLoader) {
      if (e.key === 'Enter') {
        setShowLoader(false)
        setGameOver(false)
        setScore(0)
        setSnake(INITIAL_SNAKE)
        setDirection(INITIAL_DIRECTION)
        setFood(generateFood())
        setIsPaused(false)
      }
      if (e.key === 'Escape') {
        e.preventDefault()
        setShowThankYou(true)
        setTimeout(() => onClose(), 900)
      }
      return
    }
    if (showThankYou) {
      if (e.key === 'Enter') {
        setShowThankYou(false)
        setShowLoader(true)
      }
      if (e.key === 'Escape') {
        e.preventDefault()
        setShowThankYou(false)
        setShowLoader(true)
      }
      return
    }
    if (showInstructions) {
      if (e.key === 'Enter') {
        setShowInstructions(false)
        setGameOver(false)
        setScore(0)
        setSnake(INITIAL_SNAKE)
        setDirection(INITIAL_DIRECTION)
        setFood(generateFood())
        setIsPaused(false)
      }
      if (e.key === 'Escape') {
        e.preventDefault()
        setShowThankYou(true)
        setTimeout(() => onClose(), 900)
      }
      return
    }
    if (gameOver) {
      if (e.key === 'Enter') {
        setShowInstructions(false)
        setGameOver(false)
        setScore(0)
        setSnake(INITIAL_SNAKE)
        setDirection(INITIAL_DIRECTION)
        setFood(generateFood())
        setIsPaused(false)
      }
      if (e.key === 'Escape') {
        e.preventDefault()
        setShowThankYou(true)
        setTimeout(() => onClose(), 900)
      }
      return
    }

    if (e.key === ' ') {
      e.preventDefault()
      setIsPaused(prev => !prev)
      return
    }

    // Prevent opposite direction movement
    switch (e.key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        e.preventDefault()
        if (direction.y === 0) setDirection({ x: 0, y: -1 })
        break
      case 'ArrowDown':
      case 's':
      case 'S':
        e.preventDefault()
        if (direction.y === 0) setDirection({ x: 0, y: 1 })
        break
      case 'ArrowLeft':
      case 'a':
      case 'A':
        e.preventDefault()
        if (direction.x === 0) setDirection({ x: -1, y: 0 })
        break
      case 'ArrowRight':
      case 'd':
      case 'D':
        e.preventDefault()
        if (direction.x === 0) setDirection({ x: 1, y: 0 })
        break
      default:
        break
    }
  }, [direction, gameOver, onClose, showInstructions, generateFood, showLoader, showThankYou])

  // Add mobile detection
  const isMobile = typeof window !== 'undefined' && (window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

  // Add touch handlers for mobile controls
  const handleTouchMove = (dir) => {
    if (showLoader || showThankYou || showInstructions || gameOver) return;
    switch (dir) {
      case 'up':
        if (direction.y === 0) setDirection({ x: 0, y: -1 });
        break;
      case 'down':
        if (direction.y === 0) setDirection({ x: 0, y: 1 });
        break;
      case 'left':
        if (direction.x === 0) setDirection({ x: -1, y: 0 });
        break;
      case 'right':
        if (direction.x === 0) setDirection({ x: 1, y: 0 });
        break;
      default:
        break;
    }
  };
  const handleTouchStart = (action) => {
    if (showLoader) {
      if (action === 'start') {
        setShowLoader(false);
        setGameOver(false);
        setScore(0);
        setSnake(INITIAL_SNAKE);
        setDirection(INITIAL_DIRECTION);
        setFood(generateFood());
        setIsPaused(false);
      }
      if (action === 'exit') {
        setShowThankYou(true);
        setTimeout(() => onClose(), 900);
      }
      return;
    }
    if (showThankYou) {
      if (action === 'start') {
        setShowThankYou(false);
        setShowLoader(true);
      }
      if (action === 'exit') {
        setShowThankYou(false);
        setShowLoader(true);
      }
      return;
    }
    if (showInstructions) {
      if (action === 'start') {
        setShowInstructions(false);
        setGameOver(false);
        setScore(0);
        setSnake(INITIAL_SNAKE);
        setDirection(INITIAL_DIRECTION);
        setFood(generateFood());
        setIsPaused(false);
      }
      if (action === 'exit') {
        setShowThankYou(true);
        setTimeout(() => onClose(), 900);
      }
      return;
    }
    if (gameOver) {
      if (action === 'start') {
        setShowInstructions(false);
        setGameOver(false);
        setScore(0);
        setSnake(INITIAL_SNAKE);
        setDirection(INITIAL_DIRECTION);
        setFood(generateFood());
        setIsPaused(false);
      }
      if (action === 'exit') {
        setShowThankYou(true);
        setTimeout(() => onClose(), 900);
      }
      return;
    }
    if (action === 'pause') {
      setIsPaused(prev => !prev);
      return;
    }
    if (action === 'exit') {
      setShowThankYou(true);
      setTimeout(() => onClose(), 900);
      return;
    }
  };

  // Add long-press gesture for mobile exit
  const longPressTimeout = useRef(null);
  const handleGameAreaTouchStart = (e) => {
    if (!isMobile || showLoader || showThankYou || showInstructions || gameOver) return;
    longPressTimeout.current = setTimeout(() => {
      setShowThankYou(true);
      setTimeout(() => onClose(), 900);
    }, 1000); // 1 second long-press
  };
  const handleGameAreaTouchEnd = (e) => {
    if (longPressTimeout.current) {
      clearTimeout(longPressTimeout.current);
      longPressTimeout.current = null;
    }
  };

  // Game loop
  useEffect(() => {
    const interval = setInterval(moveSnake, GAME_SPEED)
    return () => clearInterval(interval)
  }, [moveSnake])

  // Loader effect
  useEffect(() => {
    if (showLoader) {
      const timer = setTimeout(() => setShowLoader(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [showLoader])

  // Event listeners
  useEffect(() => {
    const handleKeyDown = (e) => {
      handleKeyPress(e)
    }
    
    window.addEventListener('keydown', handleKeyDown, true)
    return () => window.removeEventListener('keydown', handleKeyDown, true)
  }, [handleKeyPress])

  // Flash Game Over effect
  useEffect(() => {
    if (gameOver) {
      setFlashGameOver(true)
      const timeout = setTimeout(() => setFlashGameOver(false), 400)
      return () => clearTimeout(timeout)
    }
  }, [gameOver])

  // Helper to determine if in a 'startable' state
  const isStartableScreen = showLoader || showThankYou || showInstructions || gameOver;

  // Render board
  const renderBoard = () => {
    const board = []
    
    for (let y = 0; y < BOARD_HEIGHT; y++) {
      const row = []
      for (let x = 0; x < BOARD_WIDTH; x++) {
        const isSnake = snake.some(segment => segment.x === x && segment.y === y)
        const isFood = food.x === x && food.y === y
        const isHead = snake[0]?.x === x && snake[0]?.y === y
        
        if (isHead) {
          row.push('🐍')
        } else if (isSnake) {
          row.push('█')
        } else if (isFood) {
          row.push('🍎')
        } else {
          row.push(' ')
        }
      }
      board.push(row.join(''))
    }
    
    return board
  }

  return (
    <div
      className="snake-game"
      tabIndex={0}
    >
      {showLoader ? (
        <div className="snake-loader text-terminal-accent text-lg font-bold text-center p-8"
          onTouchStart={() => isMobile && handleTouchStart('start')}
          onClick={() => isMobile && handleTouchStart('start')}
          style={{ touchAction: 'manipulation' }}
        >
          Loading Snake Game...
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
            <div className="loading-spinner">
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
          </div>
          {isMobile && (
            <div className="text-xs text-terminal-accent mt-2">Tap anywhere to start</div>
          )}
        </div>
      ) : showThankYou ? (
        <div className="snake-thankyou text-terminal-accent text-lg font-bold text-center p-8 animate-pulse"
          onTouchStart={() => isMobile && handleTouchStart('start')}
          onClick={() => isMobile && handleTouchStart('start')}
          style={{ touchAction: 'manipulation' }}
        >
          Thank you for playing!
          {isMobile && (
            <div className="text-xs text-terminal-accent mt-2">Tap anywhere to restart</div>
          )}
        </div>
      ) : showInstructions ? (
        <div className="snake-instructions text-terminal-text text-sm text-center p-4"
          onTouchStart={() => isMobile && handleTouchStart('start')}
          onClick={() => isMobile && handleTouchStart('start')}
          style={{ touchAction: 'manipulation' }}
        >
          <div className="text-terminal-accent text-lg font-bold mb-2">🐍 Snake Game</div>
          <div className="mb-2">🎮 <b>How to play:</b></div>
          <div className="mb-1">• Use arrow keys or WASD to move the snake</div>
          <div className="mb-1">• Eat the 🍎 to grow and earn points</div>
          <div className="mb-1">• Avoid hitting walls or yourself</div>
          <div className="mb-1">• Press Space to pause/resume</div>
          <div className="mb-3">• Press ESC to exit the game</div>
          <div className="text-terminal-accent text-xs">Press Enter to start</div>
          {isMobile && (
            <div className="text-xs text-terminal-accent mt-2">Tap anywhere to start</div>
          )}
        </div>
      ) : (
        <>
          <div className="snake-header mb-4">
            <div className="text-terminal-accent text-lg font-bold mb-2">
              🐍 Snake Game
            </div>
            <div className="text-terminal-text text-sm mb-2">
              Score: {score} | Controls: Arrow Keys/WASD | Pause: Space | Exit: ESC
            </div>
            {isPaused && !gameOver && (
              <div className="text-warning-text text-sm mb-2">
                ⏸️ Game Paused - Press Space to resume
              </div>
            )}
          </div>

          {/* Game board area */}
          <div
            className="snake-board mb-4"
            onTouchStart={handleGameAreaTouchStart}
            onTouchEnd={handleGameAreaTouchEnd}
            onTouchCancel={handleGameAreaTouchEnd}
          >
            <div className="border border-terminal-accent p-1 inline-block overflow-auto" style={{ maxWidth: '100%', maxHeight: '60vh' }}>
              {renderBoard().map((row, index) => (
                <div key={index} className="text-terminal-text font-mono text-xs leading-none whitespace-pre">
                  {row}
                </div>
              ))}
            </div>
          </div>
          {/* Show mobile exit gesture message during gameplay */}
          {isMobile && !showLoader && !showThankYou && !showInstructions && !gameOver && (
            <div className="text-xs text-terminal-accent text-center mb-2">Long-press anywhere to exit the game</div>
          )}

          {gameOver && (
            <div className="snake-game-over mb-4 text-center">
              <div className={`text-error-text text-lg font-bold mb-2 ${flashGameOver ? 'animate-pulse' : ''}`}
                style={{ animation: flashGameOver ? 'flash 0.4s linear' : undefined }}>
                💀 Game Over!
              </div>
              <div className="text-terminal-text text-sm mb-2">
                Final Score: {score}
              </div>
              <div className="text-terminal-accent text-sm font-bold">
                Press Enter to play again, ESC to exit
              </div>
            </div>
          )}
        </>
      )}
      {/* Add mobile controls if on mobile */}
      {isMobile && !showLoader && !showThankYou && !showInstructions && !gameOver && (
        <div className="snake-mobile-controls" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
            <button className="snake-btn" style={{ width: 48, height: 48, margin: 4 }} onClick={() => handleTouchMove('up')}>⬆️</button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button className="snake-btn" style={{ width: 48, height: 48, margin: 4 }} onClick={() => handleTouchMove('left')}>⬅️</button>
            <button className="snake-btn" style={{ width: 48, height: 48, margin: 4, background: '#222', color: '#fff' }} onClick={() => handleTouchStart('pause')}>{isPaused ? '▶️' : '⏸️'}</button>
            <button className="snake-btn" style={{ width: 48, height: 48, margin: 4 }} onClick={() => handleTouchMove('right')}>➡️</button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
            <button className="snake-btn" style={{ width: 48, height: 48, margin: 4 }} onClick={() => handleTouchMove('down')}>⬇️</button>
          </div>
        </div>
      )}
      {/* Show start/exit on mobile for loader/instructions/gameover */}
      {isMobile && (showLoader || showThankYou || showInstructions || gameOver) && (
        <div className="snake-mobile-controls" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 16 }}>
          <button className="snake-btn" style={{ width: 80, height: 40, margin: 4, background: '#28CA42', color: '#fff', borderRadius: 8 }} onClick={() => handleTouchStart('start')}>Start</button>
          <button className="snake-btn" style={{ width: 80, height: 40, margin: 4, background: '#880808', color: '#fff', borderRadius: 8 }} onClick={() => handleTouchStart('exit')}>Exit</button>
        </div>
      )}
    </div>
  )
}

export default SnakeGame 