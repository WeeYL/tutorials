import React, { useContext } from "react";
import { NumberContext, NumberIncreaseContext } from "./UseContext03-Main";

export default function NumberComponent() {
  const value = useContext(NumberContext);
  const increase = useContext(NumberIncreaseContext);

  return (
    <div>
      <button onClick={increase}>increase</button>
      {value}
    </div>
  );
}
