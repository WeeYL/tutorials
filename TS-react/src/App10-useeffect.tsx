import { Timer } from "./components/effect/Timer"
function App() {

// The useRef Hook allows you to persist values between renders.
// It can be used to access a DOM element directly.
// useRef() only returns one item. It returns an Object called current

  return (
    <div className='App'>
     <Timer />
      {/* <MutableRef /> */}
    </div>
  )
}

export default App
