import { useState, useEffect, useRef } from 'react'
import { executeCommand, getAvailableCommands } from '../utils/commands'

export const useTerminal = () => {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [currentPath, setCurrentPath] = useState('~')
  const [commandHistory, setCommandHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [activeGame, setActiveGame] = useState(null)
  const inputRef = useRef(null)
  const outputRef = useRef(null)
  // Tab completion state
  const [tabMatches, setTabMatches] = useState([])
  const [tabIndex, setTabIndex] = useState(0)
  const [lastTabInput, setLastTabInput] = useState('')

  const AI_COMMANDS = [
    'joke',
    'fortune',
    'sudo mentor',
    'sudo make-me-laugh'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (input.trim()) {
      const commandName = input.trim().toLowerCase();
      // If it's an AI command, show loading animation first
      if (AI_COMMANDS.includes(commandName)) {
        setCommandHistory(prev => [...prev, input.trim()])
        setHistoryIndex(-1)
        setHistory(prev => [
          ...prev,
          { type: 'input', content: input, path: currentPath },
          { type: 'output', content: { output: ['Loading...'], showSpinner: true } }
        ])
        setInput('')
        // Now fetch the real result
        let result = executeCommand(input.trim(), currentPath)
        if (result instanceof Promise) {
          result = await result
        }
        // Replace the loading message with the real output
        setHistory(prev => {
          const newHistory = [...prev]
          // Find the last loading message and replace it
          for (let i = newHistory.length - 1; i >= 0; i--) {
            if (
              newHistory[i].type === 'output' &&
              newHistory[i].content &&
              newHistory[i].content.showSpinner
            ) {
              newHistory[i] = { type: 'output', content: result }
              break
            }
          }
          return newHistory
        })
        if (result.newPath) {
          setCurrentPath(result.newPath)
        }
        if (result.launchGame) {
          setActiveGame(result.launchGame)
        }
        return
      }
      // Remove special handling for cat <file>.txt, revert to original logic
      let result = executeCommand(input.trim(), currentPath)
      if (result instanceof Promise) {
        result = await result
      }
      const { output, newPath, launchGame, delay, showSpinner } = result
      setCommandHistory(prev => [...prev, input.trim()])
      setHistoryIndex(-1)
      
      if (result.clear) {
        setHistory([])
      } else {
        setHistory(prev => [
          ...prev,
          { type: 'input', content: input, path: currentPath },
          { type: 'output', content: result }
        ])
      }
      
      // Handle delay for commands like sleep
      if (delay && showSpinner) {
        setTimeout(async () => {
          setHistory(prev => {
            const newHistory = [...prev]
            // Find the last output with spinner and replace it
            for (let i = newHistory.length - 1; i >= 0; i--) {
              if (
                newHistory[i].type === 'output' &&
                newHistory[i].content &&
                newHistory[i].content.showSpinner
              ) {
                newHistory[i] = { 
                  type: 'output', 
                  content: { 
                    output: [`Completed after ${delay/1000} seconds.`] 
                  } 
                }
                break
              }
            }
            return newHistory
          })
          // If afterDelay is present, execute the rest command
          if (result.afterDelay) {
            let nextResult = executeCommand(result.afterDelay.restCommand, result.afterDelay.currentPath)
            if (nextResult instanceof Promise) {
              nextResult = await nextResult
            }
            setHistory(prev => [
              ...prev,
              { type: 'input', content: result.afterDelay.restCommand, path: result.afterDelay.currentPath },
              { type: 'output', content: nextResult }
            ])
          }
        }, delay)
      }
      
      if (newPath) {
        setCurrentPath(newPath)
      }
      
      if (launchGame) {
        setActiveGame(launchGame)
      }
      
      setInput('')
    }
  }

  const closeGame = () => {
    setActiveGame(null)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput('')
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const commands = getAvailableCommands()
      const matchingCommands = commands.filter(cmd => cmd.startsWith(input))
      if (matchingCommands.length === 1) {
        setInput(matchingCommands[0])
        setTabMatches([])
        setTabIndex(0)
        setLastTabInput('')
      } else if (matchingCommands.length > 1) {
        if (tabMatches.length > 0 && input === lastTabInput) {
          const nextIndex = (tabIndex + 1) % tabMatches.length
          setInput(tabMatches[nextIndex])
          setTabIndex(nextIndex)
        } else {
          setTabMatches(matchingCommands)
          setTabIndex(0)
          setLastTabInput(input)
          setInput(matchingCommands[0])
        }
      }
    } else {
      // Reset tab cycle on any other key
      if (tabMatches.length > 0) {
        setTabMatches([])
        setTabIndex(0)
        setLastTabInput('')
      }
    }
  }

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [history])

  useEffect(() => {
    setTimeout(() => {
      const result = executeCommand('welcome', currentPath)
      setHistory([
        { type: 'output', content: result }
      ])
    }, 500)
  }, [])

  useEffect(() => {
    const inputElement = inputRef.current
    if (inputElement) {
      inputElement.addEventListener('keydown', handleKeyDown)
      return () => inputElement.removeEventListener('keydown', handleKeyDown)
    }
  }, [historyIndex, commandHistory, input])

  return {
    input,
    setInput,
    history,
    currentPath,
    handleSubmit,
    outputRef,
    inputRef,
    activeGame,
    closeGame
  }
}