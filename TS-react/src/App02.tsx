import { Greet } from './components/props/Greet'
import {Person} from './components/props/Person'
import { Status } from './components/props/Status'
import { Heading } from './components/props/Heading'
import { Oscar } from './components/props/Oscar'
function App() {

  // SET A OBJECT 
  const leon = {
    'first':"leon",
    'last':"wee"
  }

  // PASS VALUE TO STATUS PROPERTY - STATUS 
  // TO ADD CHILDREN, SEE HEADING
  // TO ADD REACT NODE, SEE OSCAR
  return (
    <div className='App'>
      <Status status='error'/>
      <Heading> Heading Children </Heading>
      <Oscar>
        <Heading> Oscar with Heading node </Heading>
        <Greet name={"yl"} isLoggedIn={true} messageCount={3}/>
      </Oscar>

    </div>
  )
}

export default App
