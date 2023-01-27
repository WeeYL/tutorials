import { Greet } from './components/Greet'
import {Person} from './components/Person'
import { Status } from './components/Status'
import { Heading } from './components/Heading'
import { ReactNode } from './components/ReactNode'
import { Input } from './components/Input'
import { Button } from './components/Button'
import { Container } from "./components/Container"
import { PersonList } from "./components/PersonList"
import { ClassCounter } from "./components/ClassCounter"
import { GenericList } from "./components/GenericList"
import { RandomNumber } from "./components/restriction/RandomNumber"
import { Toast } from "./components/Toast"
import { AuthPrivate } from "./components/AuthPrivate"
import { AuthProfile } from "./components/AuthProfile"
import { HTMLButton, MyHTMLButton, HTMLInput } from './components/HTMLButton'
import { HTMLCustomComponent } from './components/HTMLCustomComponent'




function App() {
// **************************
// HELLO WORLD
// **************************
//   // SET A OBJECT 
//   const leon = {
//     'first':"leon",
//     'last':"wee"
//   }
//   // PASS THE OBJECT TO COMONENT PERSON 
//   return (
//     <div className='App'>
//       <Greet name='Vishwas' isLoggedIn={false} />
//       <Person name={leon}/>
//     </div>
//   )
// }

// **************************
// USE REACT NODE TO PASS IN COMPONENT
// **************************


  // STATUS PASS VALUE TO STATUS PROPERTY  
  // HEADING ADD CHILDREN TO H2
  // REACTNODE ADD COMPONENT TO COMPONENT
  // return (
  //   <div className='App'>
  //     <Status status='error'/>
  //     <Heading> Heading Children </Heading>
  //     <ReactNode>
  //       <Heading> ReactNode with Heading node </Heading>
  //       <Greet name={"yl"} isLoggedIn={true} messageCount={3}/>
  //     </ReactNode>
  //   </div>
  // )


// **************************
// PASS IN FUNCTION AS PARAM
// **************************
//  BUTTON - MOUSE EVENT MUST BE SPECIFIED IN PROPS
// const id = '100'
//  return (
//   <div className='App'>
//     <Button handleClick={(event)=>{ console.log(`clicks ${id}`) }} 
//     handleMouseOver={(event)=>{console.log("Run...")}}/>
//     <Input value={'10'} handleChange={(event)=>{ console.log(event)}} />
//   </div>
// )

// **************************
// EXTENDS COMPONENT TO THE CLASS 
// **************************
// EXTENDS COMPONENT TO THE CLASS 
  // return (
  //   <div className='App'>
  //     <ReactNode>
  //         <ClassCounter message="test" />
  //     </ReactNode>
  //   </div>
  // )


// **************************
// COMPONENT PROPS
// **************************
// PASSING COMPONENT AS A PROP. USE TYPE React.ComponentType
    // return (
    //   <div className='App'>
    //    <AuthPrivate isLoggedIn={true} component={AuthProfile}/>
    //    <AuthPrivate isLoggedIn={false} component={AuthProfile}/>
    //   </div>
    // )

// **************************
// GENERICS
// **************************
// SEE CONSOLE IN BROWSER FOR RESULT
// type MyDict = {
//   [x:string]:{id:number, name:string}
// }
// let myList = [
//   { id:1, name:"Leon"},
//   { id:2, name:"Pauline"}
// ]
// let myDict:MyDict = {
//   a:{id:1, name:"Leon"},
//   b:{ id:2, name:"Pauline"}
// }
//   return (
//     <div className='App'>chi
//       <GenericList items={myList} clickHandler={(items)=>console.log(items)}/>
//     </div>
//   )

// **************************
// TEMPLATE LITERAL
// **************************
// EXCLUDE LITERALS
  // return (
  //   <Toast position={"center"} />
  // )

// **************************
// WRAPPING HTML ELEMENT
// USE React.ComponentProps<"button">
// **************************
  return (
      <div className='App'>
        <HTMLButton variant="primary" onClick={()=>console.log("clicked")}>
          Primary Button
        </HTMLButton>

        <MyHTMLButton variant="primary" onClick={()=>console.log("MYbUTTON")}>
          Secondary Button
        </MyHTMLButton>

        <HTMLInput placeholder={"TYPE HERE"}></HTMLInput>
      </div>
  )

// **************************
// EXTRACT HTML ELEMENT PROPS
// USE React.ComponentProps<"button">
// **************************
// USE TYPEOF TO EXTRACT THE TYPE FROM THE RESULT FROM A FUNCTION

// return ( 
//     <CustomComponent name={"yl"}/>
//   )








}
export default App
