import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Timer from './timer'

function App() {
  const [timerState, setTimerState] = useState(false)
  
  return (
    <>
      <div className="card">
        {!timerState ? <button onClick={() => setTimerState(true)}>
          click to Show the timer
        </button> : <button onClick={() => setTimerState(false)}>
          click to hide the timer
        </button> }
        <div>
          {timerState ? <Timer/> : null}
        </div>
      </div>
    </>
  )
}

export default App
