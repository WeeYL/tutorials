import { useEffect, useRef, useState } from "react";

export function useCountDown(idx: number, initialCount: number) {
  const [countDown, setCountdown] = useState(-1); // to avoid self init
  const intervalRef = useRef<number>()

  // countdown for sequence
  useEffect(() => {
    if (idx == -1) { return; } // do nothing unless init by button
    // note setinterval runs in background
    intervalRef.current = window.setInterval(() => {
      setCountdown((count) => {
        console.log(count);
        return count - 1;
      });
    }, 100);
    
    return cleanup
  }, [idx]);

  // set Count down
  useEffect(() => {
    setCountdown(initialCount);
  }, [initialCount]);


  // count until zero
  useEffect(() => {
    if (countDown === 0)
    {
      return cleanup
    }
  }, [countDown])
  

  const cleanup=()=>{
    if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = undefined // reset
    }
  }
  return countDown;
}
