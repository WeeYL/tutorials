import { Greet } from './components/props/Greet'
import {Person} from './components/props/Person'
import { Status } from './components/props/Status'
import { Heading } from './components/props/Heading'
import { Oscar } from './components/props/Oscar'
import { Input } from './components/props/Input'
import { Button } from './components/props/Button'
import { Container } from "./components/props/Container"
import { PersonList } from "./components/props/PersonList"
import { Counter } from "./components/class/Counter"
import { List } from "./components/generics/List"
import { RandomNumber } from "./components/restriction/RandomNumber"
import { Toast } from "./components/templateliterals/Toast"
import { Private } from "./components/auth/Private"
import { Profile } from "./components/auth/Profile"
import UseStateComponent from './components/hooks/UseStateComponent'
import UseContextComponent from './components/hooks/UseContextComponent'
import { ThemeContextProvider } from "./components/context/ThemeContext"
import { Box } from "./components/context/Box"
import { User } from "./components/context/User"
import { UserContextProvider } from "./components/context/UserContext"
import { MutableRef } from './components/refs/MutableRef'
import UseRefComponent from './components/hooks/UseRefComponent'

function App() {
// **************************
// HELLO WORLD
// **************************
  // // SET A OBJECT 
  // const leon = {
  //   'first':"leon",
  //   'last':"wee"
  // }
  // // PASS THE OBJECT TO COMONENT PERSON 
  // return (
  //   <div className='App'>
  //     <Greet name='Vishwas' isLoggedIn={false} />
  //     <Person name={leon}/>
  //   </div>
  // )

// **************************
// USE REACT NODE TO PASS IN COMPONENT
// **************************

  // // SET A OBJECT 
  // const leon = {
  //   'first':"leon",
  //   'last':"wee"
  // }
  // // PASS VALUE TO STATUS PROPERTY - STATUS 
  // // TO ADD CHILDREN, SEE HEADING
  // // TO ADD REACT NODE, SEE OSCAR
  // return (
  //   <div className='App'>
  //     <Status status='error'/>
  //     <Heading> Heading Children </Heading>
  //     <Oscar>
  //       <Heading> Oscar with Heading node </Heading>
  //       <Greet name={"yl"} isLoggedIn={true} messageCount={3}/>
  //     </Oscar>
  //   </div>
  // )


// **************************
// PASS IN FUNCTION AS PARAM
// **************************
 // BUTTON. INCLUDE EVENT AS A PARAM TO WORK
//  return (
//   <div className='App'>
//     <Button
//       handleClick={(event,id)=>{ console.log(`clicks ${id}`) }} 
//     />
//     <Input value={'10'} handleChange={(event)=>{
//       console.log(event)}}
//     />
//   </div>
// )

// **************************
// EXTENDS COMPONENT TO THE CLASS 
// **************************
// EXTENDS COMPONENT TO THE CLASS 
  // return (
  //   <div className='App'>
  //    <Counter message="test" />
  //   </div>
  // )


// **************************
// COMPONENT PROPS
// **************************
// PASSING COMPONENT AS A PROP. USE TYPE React.ComponentType
// PRIVATE HAS PRIVATEPROPS
    // return (
    //   <div className='App'>
    //    <Private isLoggedIn={true} component={Profile}/>
    //   </div>
    // )

// **************************
// GENERICS
// **************************
// PASSING COMPONENT AS A PROP. USE TYPE React.ComponentType
// PRIVATE HAS PRIVATEPROPS
// SEE CONSOLE IN BROWSER FOR RESULT

  // let myList = [
  //   { id:1,
  //     name:"Leon"
  //   },
  //   { id:2,
  //     name:"Pauline"
  //   }
  // ]
  //   return (
  //     <div className='App'>
  //      <List items={myList} clickHandler={(item)=>console.log(item)}/>
  //     </div>
  //   )

// **************************
// TEMPLATE LITERAL
// **************************
  // return (
  //   <Toast position={"center"} />
  // )

// **************************
// USE STATE
// **************************
//  return (
//    <UseStateComponent/>
//  )

// **************************
// USE CONTEXT
// **************************
// return (
//   <div>

//       <UseContextComponent/>

//       <ThemeContextProvider>
//       <Box />
//       </ThemeContextProvider>

//       <UserContextProvider>
//         <User />
//       </UserContextProvider>
//   </div>
// )

// **************************
// USE REF
// **************************
  // return (
  //   <div>
  //     <MutableRef />
  //     <UseRefComponent/>
  //   </div>
  // )
  



}
export default App
