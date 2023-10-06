import React from 'react'

export const ThemeContext = React.createContext()

const num = 123456
const string = "string"

export default function ThemeProvider({children}){

    return(
        <ThemeContext.Provider value={{num,string}}>
            {children}
        </ThemeContext.Provider>
    )
}



