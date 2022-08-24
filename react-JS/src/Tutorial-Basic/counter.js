import React, { Component } from "react";

class Counter extends Component {


  /* renders */
  render() {
    const {children,onIncrement,onDelete,value} = this.props // props

    return (
      <div>
        {children }
        <div className="badge"><h4>{value}</h4></div>
        <button onClick={onIncrement}>Increase</button>
        <button onClick={onDelete}>Delete</button>
        
      </div>
    );
  }
}
export default Counter;




