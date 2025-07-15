import React from 'react'
import Lanyard from './components/Lanyard'
import Terminal from './components/Terminal'

function App() {
  return (
    <div className="main-flex-layout min-h-screen bg-terminal-bg flex flex-col md:flex-row md:overflow-auto">

      <div className="left-section relative z-10 w-full md:w-2/5 flex justify-center p-4 md:p-8 sm:p-2 items-start">
        <Lanyard />
      </div>

      <div className="right-section relative z-0 w-full md:w-3/5 p-2 md:p-4 sm:p-1 flex justify-center items-start">
        <div className="w-full max-w-full sm:max-w-full md:max-w-full">
          <Terminal />
        </div>
      </div>
    </div>
  )
}

export default App