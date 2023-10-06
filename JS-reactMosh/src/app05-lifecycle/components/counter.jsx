import React, { Component } from "react";

class Counter extends Component {

  componentDidUpdate(){
    console.log("counter updated")
  }
  componentWillUnmount(){
    console.log("counter unmount")
  }
  // render
  render() {
    console.log("counter rendered")
    return (
      <div>
        <button onClick={()=>this.props.onIncrement(this.props.counter)} type="button" className="btn btn-primary m-2 myText">Increase
          <span className="badge m-2 bg-primary">{this.props.counter.value}</span>
        </button>
        <button type="button" onClick={()=>this.props.onDelete(this.props.counter.id)} className="btn btn-secondary m-2 myText">deleteButton </button>
      </div>
    );
  }
 
}

export default Counter;
