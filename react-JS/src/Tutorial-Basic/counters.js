import React, { Component } from "react";
import Counter from "./counter";
import NavBar from "./navBar";

class Counters extends Component {
  /* state */
  state = {
    counters: [
      { id: 1, value: 4 }, // set initial values
      { id: 2, value: 0 },
      { id: 3, value: 0 },
    ],
  };

  /* function */

  handleIncrement(counter) {
    const { counters } = this.state;
    const newCounters = [...counters]; // make a copy of whole array
    const counterIndex = counters.indexOf(counter); // get indexOf(object)
    newCounters[counterIndex].value++; // do something
    this.setState({ counters: newCounters }); // set state
  }

  handleDelete = (IDtoDelete) => {
    // filter the counter
    const counters = this.state.counters.filter((c) => c.id !== IDtoDelete);
    this.setState({ counters });
  };
  handleReset = () => {
    // overwrites all counters
    const counters = this.state.counters.map((counter) => {
      counter.value = 0;
      return counter;
    });

    this.setState({ counters });
  };

  /* renders */
  render() {
    const numOfCounters = this.state.counters.filter((n) => n.value > 0).length;
    return (
      <div>
        <div>
          <NavBar numOfCounters={numOfCounters} />
          {this.state.counters.map((
            counter // eg 1, send properties to each counter
          ) => (
            <>
              <Counter
                key={counter.id}
                value={counter.value}
                Id={counter.id}
                selected={true}
                onDelete={() => this.handleDelete(counter.id)} // pass down function
                onReset={this.handleReset}
                onIncrement={() => this.handleIncrement(counter)}
              >
                <h4> Counter {counter.id}</h4>{" "}
                {/* send to each children counter, access this.props.children */}
              </Counter>
            </>
          ))}
        </div>

        <div>
          <button onClick={this.handleReset}>Reset</button>
        </div>
      </div>
    );
  }
}
export default Counters;
