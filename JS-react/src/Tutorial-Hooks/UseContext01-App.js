import React, {useContext} from 'react'


/* 
context creates context container
(Note: one context container for only one value or only one function)
context holds data and functions
context returns Provider to pass down data to children

component consume data from context
component returns data in html

App returns provider to pass down data to components
*/
export const UserContext = React.createContext() 
export const ChannelContext = React.createContext()

export function MyComponent(){

  const {first, last} = useContext(UserContext)
  const channel = useContext(ChannelContext)

  return(
  <div >
          {first} {last} - {channel}
  </div>
  )
}



function App(){
  return(
    <div >
      <UserContext.Provider value={{first:'Johnny',last:'Jazz'}}>   
        <ChannelContext.Provider value={'MTV'}>  
          <MyComponent/>
        </ChannelContext.Provider>
      </UserContext.Provider>
    </div>

  )
}

export default App