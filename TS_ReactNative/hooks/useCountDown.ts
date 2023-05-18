import { useEffect, useState } from "react";

export function useCountDown(idx: number, initialCount: number) {
  const [countDown, setCountdown] = useState(-1); // to avoid self init

  // countdown for sequence
  useEffect(() => {
    if (idx == -1) { return; } // do nothing unless init by button

    const intervalId = window.setInterval(() => {
      setCountdown((count) => {
        console.log(count);
        return count - 1;
      });
    }, 100);
    
    return () => window.clearInterval(intervalId);
  }, [idx]);

  // set Count down
  useEffect(() => {
    setCountdown(initialCount);
  }, [initialCount]);

  console.log(idx)
  return countDown;
}
