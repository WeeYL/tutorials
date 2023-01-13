import { LoggedIn } from "./components/state/LoggedIn"
import { User } from "./components/state/User"

function App() {


  // USE STATE
  // TYPE ASSERTION IN USER COMPONENT
  return (
    <div className='App'>
      <LoggedIn/>
      <User/>
    </div>
  )
}

export default App
