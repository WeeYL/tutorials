import { ThemeContextProvider } from "./components/context/ThemeContext"
import { User } from "./components/context/User"
import { UserContextProvider } from "./components/context/UserContext"

function App() {

// CONTEXT: CREATECONTEXT > CONTEXTPROVIDER WITH VALUE > 
// COMPONENT > USECONTEXT TO CONSUME AND WORK WITH THE CONTEXT VALUE
// APP > PROVIDER PASS THE CONTEXT VALUE TO COMPONENT
  return (
    <div className='App'>
        <UserContextProvider>
          <User />
        </UserContextProvider>
    </div>
  )
}

export default App
