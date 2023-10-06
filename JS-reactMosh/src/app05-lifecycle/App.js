// import './App.css';
import Counters from "./components/counters";
import React, { Component } from "react";
import NaviBar from "./components/navibar";

class App extends Component {

  constructor(){
    super()
    console.log("App Constructor, run once")
  }

  componentDidMount(){
    console.log("App mounted")
  }
  state = {
    counters: [
      { id: 1, value: 0 },
      { id: 2, value: 2 },
      { id: 3, value: 3 },
    ],
  };

  handleDelete = (id) => {
    let counters = this.state.counters.filter((b) => b.id !== id);
    this.setState({ counters: counters });
  };
  handleIncrement = (counter) => {
    const newCounters = [...this.state.counters]; // make a copy
    const index = newCounters.indexOf(counter);
    newCounters[index] = { ...counter }; // make a copy
    newCounters[index].value++;
    this.setState({ counters: newCounters });
  };

  render() {
    console.log("component rendered")
    return (
      
      <>
        <NaviBar counters={this.state.counters}/>
        <Counters
          counters={this.state.counters}
          onDelete={this.handleDelete}
          onIncrement={this.handleIncrement}
        />
      </>
    );
  }
}

export default App;
