import { useReducer } from 'react'

// SET STATE
type CounterState = {
  count: number
}

// SET DISCRIMINATED UNION BOTH ACTIONS UNDER COUNTERACTION 
type UpdateAction = {
  type: 'increment' | 'decrement'
  payload: number
}

type ResetAction = {
  type: 'reset'
}

// FOR INCREMENT AND DECREMENT AND RESET
type CounterAction = UpdateAction | ResetAction

// FUNCTION
const initialState = { count: 0 }

function reducer(state: CounterState, action: CounterAction) {
  // BASED ON ACTION TYPE, RETURN PAYLOAD
  switch (action.type) {
    case 'increment':
      return { count: state.count + action.payload }
    case 'decrement':
      return { count: state.count - action.payload }
    case 'reset':
      return initialState
    default:
      return state
  }
}

  // SET DISPATCH TYPE AND PAYLOAD
export const Counter = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'increment', payload: 10 })}>
        Increment 10
      </button>
      <button onClick={() => dispatch({ type: 'decrement', payload: 10 })}>
        Decrement 10
      </button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </>
  )
}
