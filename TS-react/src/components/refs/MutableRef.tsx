import { useState, useRef, useEffect } from 'react'

export const MutableRef = () => {
  const [timer, setTimer] = useState(0)
  const interValRef = useRef<number | null>(null)

  // ON CLICK
  const stopTimer = () => {
    if (interValRef.current) { // use if to clear error
    window.clearInterval(interValRef.current) 
    console.log(interValRef.current)
  }}

  // SET INTERVAL REF AS TIMER COUNT
  useEffect(() => {
    interValRef.current = window.setInterval(() => {
      setTimer(timer => timer + 1)
    }, 1000)
    return () => {
      stopTimer()
    }
  }, [])

  return (
    <div>
      HookTimer - {timer} -
      <button onClick={() => stopTimer()}>Stop Timer</button>
    </div>
  )
}
