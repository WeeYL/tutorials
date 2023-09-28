import React, { Component } from "react";

class Counter extends Component {
  // state
  state = {
    count: 0,
    arg:0
  };
  // render
  render() {
    return (
      <div>
        <button onClick={this.handleIncrement} type="button" className="btn btn-primary m-2 myText">handleIncrement</button>
        <span className={this.getBadge()}>{this.formatCount()}</span>
        <button onClick={this.handleDecrement} type="button" className="btn btn-secondary m-2 myText">handleDecrement</button>
        <button onClick={()=>this.handlePassArgument({count:this.state.count})} type="button" className="btn btn-warning m-2 myText">handlePassArgument
          <span className={this.getBadge()}>{this.state.arg}</span>
        </button>

      </div>
    );
  }
  // method handling clicks. IMPT: Use arrow function only
  handleIncrement = () =>{
    this.setState({count: this.state.count += 1}) // updating state
  }
  handleDecrement = () =>{
    let count = this.state.count
    count >0 && this.setState({count: this.state.count -= 1}) // updating state
  }

  // pass argument in function
  handlePassArgument = (arg) =>{
    this.setState({arg:arg['count']})
    return this.state.arg
  }

  // method
  formatCount() {
    const { count } = this.state;
    console.log(count)
    return count <= 0 ? "zero" : count;
  }
  // method to change style attribute
  getBadge(){
    let classes = "badge m-2 bg-"
    classes += this.state.count <= 0? "warning":"primary"
    return classes
  }
}

export default Counter;
