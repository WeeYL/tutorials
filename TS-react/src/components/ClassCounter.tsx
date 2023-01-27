import { Component } from 'react'

type CounterProps = {
  message: string
}
type CounterState = {
  count: number
}

// PASS THE TYPE TO THE CLASS COMPONENT <PROPS THEN STATE, IN THIS ORDER>
export class ClassCounter extends Component<CounterProps, CounterState> {
 
  // STATE
  state = {count: 0}

  // FUNCTION
  handleClick = () => {
    this.setState(prevState => ({ count: prevState.count + 1 }))
  }
  // RENDER()
  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Increment</button>
        {this.props.message} {this.state.count}
      </div>
    )
  }
}
