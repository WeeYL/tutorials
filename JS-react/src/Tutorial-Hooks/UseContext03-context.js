import React, { useState } from "react";

export const NumberContext = React.createContext();
export const NumberIncreaseContext = React.createContext();

export default function NumberProvider({ children }) {
  const [value, setValue] = useState(10);

  function increase() {
    setValue(value+1)
  }

  return (
    <NumberContext.Provider value={value}>
      <NumberIncreaseContext.Provider value={increase}>
          {children}
        </NumberIncreaseContext.Provider>
    </NumberContext.Provider>
  );
}
