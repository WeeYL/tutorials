import { Greet } from './components/props/Greet'
import {Person} from './components/props/Person'
import { Status } from './components/props/Status'
import { Heading } from './components/props/Heading'
import { Oscar } from './components/props/Oscar'
import { Button } from './components/props/Button'

function App() {

  // SET A OBJECT 
  const leon = {
    'first':"leon",
    'last':"wee"
  }

  // USING MOUSEEVENT CLICK, INCLUDE EVENT AS A PARAM TO WORK
  return (
    <div className='App'>
      <Button
        handleClick={(event,id)=>{
          console.log(`clicks ${id}`)
        }}
      />


    </div>
  )
}

export default App
