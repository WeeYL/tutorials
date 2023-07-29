import React, { useState } from "react";

export const CounterFC = (props) => {

  // state
  const [count, setCount] = useState(0);

  // func
  const Add = () => setCount(count + 1);
  const SubTrack = () => setCount(count - 1);

  return (
    <div>
      <h2>hello {props.name}</h2>
      <button onClick={Add}>Add</button>
      <h2>{count}</h2>
      <button onClick={SubTrack}>SubTrack</button>
    </div>
  );
};

// ToggleColor
export const ToggleColor = () => {
    const onColor = "blue";
    const offColor = "red";

    const [isOn, setIsOn] = useState(true);
    const toggle = () => setIsOn(!isOn);

    const color = (isOn) ? onColor : offColor;

    return (
    <div style={ {color:'red'} } >

    <button style={ {color} } onClick={toggle}>click</button>
    </div>
    );
};



