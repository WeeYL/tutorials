import { useEffect, useRef, useState } from "react";

export function useCountDown(idx: number = -1, initialCount: number = -1) {
  const [countDown, setCountdown] = useState(initialCount); // to avoid self init
  const [isRunning, setIsRunning] = useState(false)

  const intervalRef = useRef<number>()
  
  // setup Count down
  useEffect(() => {
    setCountdown(initialCount);
  }, [initialCount]);

  // countdown for sequence index
  useEffect(() => {
    if (idx == -1) { return; } // do nothing unless init by button
    console.log(`${idx } is running ${isRunning}`)    // start

    if (isRunning && !intervalRef.current) {
      intervalRef.current = window.setInterval(() => { // note setinterval runs in background
        setCountdown((count) => {
          return count - 1;
        });
      }, 1000);
    }
    
    return cleanup
  }, [idx, isRunning]);


  // count until zero
  useEffect(() => {
    if (countDown === 0)
    {
      return cleanup
    }
  }, [countDown])
  

  // cleanup
  const cleanup=()=>{
    if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = undefined // reset
        setIsRunning(false) // isRunning
    }
  }

  const start =(count?:number)=>{
    setIsRunning(true)
    setCountdown(count ?? initialCount)
    return isRunning
  }

  return {countDown, 
    isRunning, 
    stop: cleanup,
    start:start
  };
}
