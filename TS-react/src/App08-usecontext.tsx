import { LoggedIn } from "./components/state/LoggedIn"
import { User } from "./components/state/User"
import { ThemeContextProvider } from "./components/context/ThemeContext"
import { Box } from "./components/context/Box"
function App() {


// FLOW: CREATECONTEXT > CONTEXTPROVIDER WITH VALUE > 
// COMPONENT > USECONTEXT TO CONSUME AND WORK WITH THE CONTEXT VALUE
// APP > PROVIDER PASS THE CONTEXT VALUE TO COMPONENT
  return (
    <div className='App'>
      <ThemeContextProvider>
        <Box />
      </ThemeContextProvider>
    </div>
  )
}

export default App
