import React from 'react'
import { useTerminal } from '../hooks/useTerminal'
import TerminalHeader from './TerminalHeader'
import TerminalOutput from './TerminalOutput'
import SnakeGame from './SnakeGame'
import MatrixRain from './MatrixRain'
import '../styles/terminal.css'

const Terminal = () => {
  const {
    input,
    setInput,
    history,
    currentPath,
    handleSubmit,
    outputRef,
    inputRef,
    activeGame,
    closeGame
  } = useTerminal()

  return (
    <div
      className="terminal-container-long flex flex-col flex-1 min-h-0"
      style={{
        background: 'rgba(7, 11, 20, 0.72)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: '0 4px 48px rgba(0,0,0,0.45)',
      }}
    >
      <TerminalHeader currentPath={currentPath} hostname="tensor-core" />
      
      <div className="terminal-body flex-1 min-h-0 overflow-auto">
        {activeGame === 'snake' ? (
          <div className="terminal-output">
            <SnakeGame onClose={closeGame} />
          </div>
        ) : activeGame === 'matrix' ? (
          <div className="terminal-output">
            <MatrixRain onClose={closeGame} />
          </div>
        ) : (
          <>
            <TerminalOutput 
              history={history} 
              outputRef={outputRef} 
              currentPath={currentPath}
            />
            
            <div className="terminal-input-area">
              <form onSubmit={handleSubmit} className="terminal-line">
                <span className="terminal-prompt">
                  amisha@tensor-core:{currentPath}$
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="terminal-input"
                  spellCheck={false}
                />
                <span className="terminal-cursor"></span>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Terminal