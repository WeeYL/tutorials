import React, { Component } from "react";

class Counter extends Component {
  // state
  state = {
    count: 0,
    addTwo: 0,
  };

  /* function */
  handleIncrement = () => {
    this.setState({ count: this.state.count + 1 }); // set state
  };
  handlePassArgument = (addTwo) => {
    console.log(addTwo);
    this.setState({ addTwo: addTwo + 2 }); // pass argument
  };

  // render
  render() {
    const { count, addTwo } = this.state;

    return (
      <div>
        <div>
          {count}
          <button onClick={this.handleIncrement}>Increase</button>
        </div>
        <div>
          {addTwo}
          <button onClick={() => this.handlePassArgument(addTwo)}>
            Increase by 2
          </button>
        </div>
      </div>
    );
  }
}
export default Counter;
