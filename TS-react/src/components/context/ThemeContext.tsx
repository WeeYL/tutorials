import React, { createContext } from 'react'
import { theme } from './theme'

// In a typical React application, 
// data is passed top-down (parent to child) via props, 
// but such usage can be cumbersome for certain types of props (e.g. locale preference, UI theme) 
// that are required by many components within an application. 
// Context provides a way to share values like these between components 
// without having to explicitly pass a prop through every level of the tree.


type ThemeContextProviderProps = {
  children: React.ReactNode
}

// CREATE THE THEME OBJECT CONTEXT
export const ThemeContext = createContext(theme) 

// STORE INTO A CONTAINER TO BE READY TO PASS DOWN FOR CONSUMPTION
export const ThemeContextProvider = ({ children }: ThemeContextProviderProps) => {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}
