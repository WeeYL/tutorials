import React from "react";
import NumberProvider from "./UseContext03-context";
import NumberComponent from "./UseContext03-Component01";

export default function App() {
  return (
    <NumberProvider>
      <NumberComponent />
    </NumberProvider>
  );
}
