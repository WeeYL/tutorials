import React, { useRef, useState } from "react";

/* 
ref.current is like a box of values

setup a reference for useRef initial value, 
place the ref in the html 
setup handler for ref
*/

/* useRef current 1 */

export function Simple() {
  const myRef = useRef(null); // setup
  const refHandle = () => console.log(myRef.current); // handler // returns <button> example1 </button>
  return (
    <button ref={myRef} onClick={refHandle}>
      {" "}
      {/* reference */}
      example 1
    </button>
  ); // updates
}

/* useRef current 2 */
export function ClickLoggin() {
  const countRef = useRef(0);

  const countHandle = () => {
    countRef.current++;
    console.log(`Clicked ${countRef.current} times`);
  };

  console.log("I rendered!"); // only renders in each refresh change in this js eg, add new line

  return (
    <div>
      <button onClick={countHandle}>example 2 click logging </button>
      <span>clicked {countRef.current}</span>{" "}
      {/* appears in each renders only */}
    </div>
  );
}

/* useRef current 3 */
export function Stopwatch() {
  const [value, setValue] = useState(0);
  const timerRef = useRef(0);

  // start
  const startHandle = () => {
    timerRef.current = setInterval(() => {
      // set timerRef.current in order to use clearInterval
      setValue((value) => value + 1);
    }, 1000);
  };

  // stop
  const stopHandle = () => {
    clearInterval(timerRef.current); // stops the timer
    console.log(timerRef.current);
  };

  // reset
  const resetHandle = () => {
    setValue(0);
    clearInterval(timerRef.current);
  };
  return (
    <div>
      <button onClick={startHandle}> start</button>
      <button onClick={stopHandle}> stop</button>
      <button onClick={resetHandle}> reset</button>
      {value}
    </div>
  );
}

/* useRef ref 1 

set useRef initial values
place ref in html to invoke handler
handler to runs function to change html

*/

export function InputFocus() {
  const focusRef = useRef(null);
  const colorRef = useRef("blue");

  const focusHandle = () => {
    focusRef.current.focus();
    focusRef.current.style.backgroundColor = "purple";
    console.log(focusRef.current); // returns <input type="text">
  };
  const colorHandle = () => (colorRef.current.style.backgroundColor = "green");

  return (
    <div>
      <input ref={focusRef} type="text"></input>
      <button onClick={focusHandle}> click to focus and change bg color</button>

      <button
        ref={colorRef}
        style={{display:"block", backgroundColor: colorRef.current }}
        onClick={colorHandle}
      >
        click to change color
      </button>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Simple />
      <ClickLoggin />
      <Stopwatch />
      <InputFocus />
    </>
  );
}
