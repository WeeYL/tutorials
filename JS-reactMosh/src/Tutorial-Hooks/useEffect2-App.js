import { useState, useEffect } from "react";

export default function App() {
  const [number, setNumber] = useState(0);


  // run when number is the dependency, it runs again and again
  // useEffect(() => {
  //   console.count("run effects")
  //   setInterval(() => {
  //     setNumber(number+1)
  //   }, 1000);
  // }, [number]);

  // almost there, but it renders whenever update to code
  useEffect(() => {
    console.count("run effects")
    const interval = setInterval(() => {
      setNumber(number+1)
    }, 1000);
    return ()=>{
      console.log("clear after each run")
      clearInterval(interval)
    }
  }, [number]);



  return (
    <>
      <div>{number}</div>
    </>
  );
}
