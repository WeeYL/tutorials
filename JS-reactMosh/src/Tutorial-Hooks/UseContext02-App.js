import React from 'react'
import Component1 from './UseContext02-Component1'
import Component2 from './UseContext02-Component2'
import ThemeProvider from './UseContext02-ThemeProvider'


export default function App(){

return(
    <ThemeProvider>
        <Component1/>
        <Component2/>
    </ThemeProvider>
  )
}
