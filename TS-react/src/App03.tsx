import { Input } from './components/props/Input'
import { Button } from './components/props/Button'

function App() {

  // SET A OBJECT 
  const leon = {
    'first':"leon",
    'last':"wee"
  }

  // BUTTON. INCLUDE EVENT AS A PARAM TO WORK
  
  return (
    <div className='App'>
      <Button
        handleClick={(event,id)=>{
          console.log(`clicks ${id}`)
        }}
      />

      <Input value={'10'} handleChange={(event)=>{
        console.log(event)
      }}/>


    </div>
  )
}

export default App
