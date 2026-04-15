import React, { useState, useEffect } from 'react'

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

const displayPath = (path) => {
  if (!path || path === '~') return '~'
  return path.replace(/^~\//, '~/')
}

const STATUS_TICKS = [
  'VRAM 14.2 / 16.0 GiB · util 0% (browser lied)',
  'tokens/s: ask your rate limit · not this TTY',
  'entropy: H(arXiv tabs) ≈ high',
  'TCP_NODELAY=1 · impatience=1',
  'checkpoint: epoch ∞ / loss still vibes',
  'RAG recall@5: “good enough for demo”',
  'GIL spotted in prod · python sends regards',
  'kubectl get pods · imagination only',
  'CUDA kernel: compiled with -funroll-loops + hope',
]

const TerminalHeader = ({ currentPath, hostname = 'tensor-core' }) => {
  const [hovered, setHovered] = useState(false)
  const [tick, setTick] = useState(0)
  const pathLabel = displayPath(currentPath)

  useEffect(() => {
    const id = window.setInterval(() => {
      setTick((n) => (n + 1) % STATUS_TICKS.length)
    }, 4800)
    return () => window.clearInterval(id)
  }, [])

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
      <div className="terminal-title text-[10px] sm:text-xs md:text-sm lg:text-base flex-1 text-center font-mono truncate px-1 flex flex-col gap-0.5 min-w-0">
        <div className="truncate">
          <span className="text-cyan-400/90">amisha@{hostname}</span>
          <span className="text-slate-500">:</span>
          <span className="text-fuchsia-400/80">{pathLabel}</span>
          <span className="text-slate-500"> — bash — </span>
          <span className="text-emerald-400/80">inference_ready</span>
        </div>
        <div
          className="truncate text-[9px] sm:text-[10px] text-slate-500/90 tracking-wide"
          title={STATUS_TICKS[tick]}
        >
          <span className="text-cyan-600/80">SYS</span>
          <span className="mx-1 text-slate-600">│</span>
          {STATUS_TICKS[tick]}
        </div>
      </div>
      <div className="w-8 shrink-0" />
    </div>
  )
}

export default TerminalHeader
