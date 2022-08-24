import React from 'react'
import Component1 from './UseContext02-Component1'
import Component2 from './UseContext02-Component2'
import ThemeProvider from './UseContext02-Context'

/* 
context creates context container
(Note: one context container for only one value or only one function)
context holds data and functions
context returns Provider to pass down data to children

component consume data from context
component returns data in html

App returns provider to pass down data to components
*/

export default function App(){

return(
    <ThemeProvider>
        <Component1/>
        <Component2/>
    </ThemeProvider>
  )
}
