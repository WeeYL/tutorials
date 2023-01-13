import React, { useState, createContext } from 'react'

type AuthUser = {
  name: string
  email: string
}

type UserContextType = {
  user: AuthUser | null
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>
  printName: Function
    
  }

type UserContextProviderProps = {
  children: React.ReactNode
}

function printName(name:string){
  console.log(`name is ${name}`)
}

// CREATE CONTEXT FOR FUTURE TYPE

export const UserContext = createContext({} as UserContextType) // export const UserContext = createContext<UserContextType | null>(null)

// PASS OVER USESTATE 
export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  return (
    <UserContext.Provider value={{ user, setUser, printName }}>
      {children}
    </UserContext.Provider>
  )
}
