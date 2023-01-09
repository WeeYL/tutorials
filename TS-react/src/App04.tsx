import { Container } from "./components/props/Container"
import { PersonList } from "./components/props/PersonList"
function App() {


  const nameList = [
    {
      first: 'Bruce',
      last: 'Wayne'
    },
    {
      first: 'Clark',
      last: 'Kent'
    },
    {
      first: 'Princess',
      last: 'Diana'
    }
  ]

  // CSS PROPERTIES
  // NAME ARRAY
  
  return (
    <div className='App'>
      <Container styles={{border:'1px black solid', color:'red', fontSize:'10px'}}>
        <PersonList names={nameList}/>
      </Container>


    </div>
  )
}

export default App
