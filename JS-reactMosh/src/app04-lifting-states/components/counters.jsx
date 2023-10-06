import React, { Component } from 'react'
import Counter from './counter';

// HOLDS ALL THE COUNTERS

class Counters extends Component {

    render() { 
        return (
            this.props.counters.map(counter=>{
                return (
                    <Counter 
                    key={counter.id} 
                    onDelete={this.props.onDelete} 
                    onIncrement={this.props.onIncrement} 
                    counter={counter}/>
                )
            })
        );
    }
}
 
export default Counters;