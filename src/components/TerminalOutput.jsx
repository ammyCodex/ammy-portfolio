
import React, { useEffect, useState } from 'react'

const TerminalOutput = ({ history, outputRef, currentPath }) => {
  const [animatedOutputs, setAnimatedOutputs] = useState({})

  const isMobile = typeof window !== 'undefined' && (window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

  useEffect(() => {
    // Find the most recent output with a downloadUrl or openUrl
    const last = history[history.length - 1]
    if (last && last.type === 'output' && last.content) {
      if (last.content.downloadUrl) {
        const { downloadUrl, downloadName } = last.content
        if (isMobile) {
          // On mobile, open in new tab
          window.open(downloadUrl, '_blank', 'noopener,noreferrer')
        } else {
          // On desktop, trigger download
          const link = document.createElement('a')
          link.href = downloadUrl
          link.download = downloadName || ''
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        }
      } else if (last.content.openUrl) {
        // Open URL in new tab
        window.open(last.content.openUrl, '_blank', 'noopener,noreferrer')
      }
    }
  }, [history])

  // Handle animations for cat commands
  useEffect(() => {
    const lastItem = history[history.length - 1]
    if (lastItem && lastItem.type === 'output' && lastItem.content && lastItem.content.animate) {
      const index = history.length - 1
      setAnimatedOutputs(prev => ({ ...prev, [index]: true }))
    }
  }, [history])

  const renderAnimatedLine = (line, lineIndex, isAnimated = false) => {
    if (!isAnimated) {
      return renderLineWithDemoLinks(line)
    }

    return (
      <div className="terminal-text animated-line" style={{ animationDelay: `${lineIndex * 0.1}s` }}>
        {renderLineWithDemoLinks(line)}
      </div>
    )
  }

  const renderLineWithDemoLinks = (line) => {
    // Return the line as-is without making any links clickable
    return line
  }

  const renderLoadingSpinner = () => (
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
  )

  return (
    <div ref={outputRef} className="terminal-output">
      {history.map((item, index) => (
        <div key={index}>
          {item.type === 'input' && (
            <div className="terminal-line">
              <span className="terminal-prompt">
                root@amisha.io:{item.path}$
              </span>
              <span className="terminal-text">{item.content}</span>
            </div>
          )}
          {item.type === 'output' && (
            <div className="terminal-response">
              {item.content.showSpinner ? (
                <div className="terminal-text">
                  {renderLoadingSpinner()}
                </div>
              ) : item.content.tabRecommend && Array.isArray(item.content.output) ? (
                <div className="tree-structure">
                  {item.content.output.map((line, lineIndex) => (
                    line.trim() === ''
                      ? <pre key={lineIndex}>&nbsp;</pre>
                      : <pre key={lineIndex}>{line}</pre>
                  ))}
                </div>
              ) : Array.isArray(item.content.output) ? (
                item.content.output.map((line, lineIndex) => (
                  line.includes('<span') ? (
                    <div key={lineIndex} className="terminal-text" dangerouslySetInnerHTML={{ __html: line }} />
                  ) : (
                    renderAnimatedLine(line, lineIndex, animatedOutputs[index])
                  )
                ))
              ) : typeof item.content.output === 'string' ? (
                item.content.output.split('\n').map((line, lineIndex) => (
                  <div key={lineIndex} className="terminal-text">{line}</div>
                ))
              ) : Array.isArray(item.content) ? (
                item.content.map((line, lineIndex) => (
                  renderAnimatedLine(line, lineIndex, animatedOutputs[index])
                ))
              ) : null}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default TerminalOutput