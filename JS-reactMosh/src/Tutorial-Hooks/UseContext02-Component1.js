import React, { useContext } from "react";
import { ThemeContext } from "./UseContext02-ThemeProvider";

export default function Component1() {
  const { num } = useContext(ThemeContext);
  return <button> {num} </button>;
}
