import { Greet } from './components/props/Greet'
import {Person} from './components/props/Person'

function App() {

  // SET A OBJECT 
  const leon = {
    'first':"leon",
    'last':"wee"
  }

  // PASS THE OBJECT TO COMONENT PERSON 
  return (
    <div className='App'>
      <Greet name='Vishwas' isLoggedIn={false} />
      <Person name={leon}/>
    </div>
  )
}

export default App
