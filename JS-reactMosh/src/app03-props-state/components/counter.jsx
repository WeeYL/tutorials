import React, { Component } from "react";

class Counter extends Component {

  // render
  render() {
    return (
      <div>
        <button onClick={()=>this.props.onIncrement()} type="button" className="btn btn-primary m-2 myText">Increase
          <span className="badge m-2 bg-primary">{this.props.value}</span>
        </button>
        <button type="button" onClick={this.props.onDelete} className="btn btn-secondary m-2 myText">deleteButton </button>
      </div>
    );
  }
 
}

export default Counter;
