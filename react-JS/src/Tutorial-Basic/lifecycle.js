import React, { Component } from "react";

class LifeCycle extends Component {
  // constructor
  constructor() {
    super();
    console.log("constructor");
  }

  componentDidMount() {
    console.log("Mounted");
  }
  /* renders */
  render() {

    console.log("rendered");
    return <div></div>;
  }
}
export default LifeCycle;
