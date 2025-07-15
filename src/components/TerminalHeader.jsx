import React, { useState } from 'react'

const MacCloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="7" cy="7" r="7" fill="#FF5F57" />
    <line x1="4.2" y1="4.2" x2="9.8" y2="9.8" stroke="#BF2E26" strokeWidth="1.6" strokeLinecap="round" />
    <line x1="9.8" y1="4.2" x2="4.2" y2="9.8" stroke="#BF2E26" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
)

const MacMinimizeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="7" cy="7" r="7" fill="#FFBD2E" />
    <rect x="4" y="6.2" width="6" height="1.6" rx="0.8" fill="#BF7A00" />
  </svg>
)

const MacMaximizeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="7" cy="7" r="7" fill="#28CA42" stroke="#1A7F2A" strokeWidth="1.6" />
  </svg>
)

const TerminalHeader = ({ currentPath }) => {
  const [hovered, setHovered] = useState(false)
  return (
    <div className="terminal-header flex flex-row items-center px-3 sm:px-5 py-2 sm:py-4">
      <div
        className="terminal-controls"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="control-button close">
          {hovered && <MacCloseIcon />}
        </div>
        <div className="control-button minimize">
          {hovered && <MacMinimizeIcon />}
        </div>
        <div className="control-button maximize">
          {hovered && <MacMaximizeIcon />}
        </div>
      </div>
      <div className="terminal-title text-xs sm:text-sm md:text-base flex-1 text-center">
        root@amisha.io — ~zsh — 112×46
      </div>
      <div className="w-8"></div>
    </div>
  )
}

export default TerminalHeader