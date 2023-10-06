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

const UserContext = React.createContext() 

function displayNum(num1){
  return num1
}
function MyComponent(){
  
  const {first, last, num1} = useContext(UserContext)
  
  console.log(first, last, num1)
  return(<div> {first} {last} {displayNum(num1)}</div>)
}


function App(){
  const num1 = 1234
  return(
    <div >
      <UserContext.Provider value={{first:'Johnny',last:'Jazz', num1:num1, f:displayNum(num1)}}>   
          <MyComponent/>
      </UserContext.Provider>
    </div>

  )
}

export default App