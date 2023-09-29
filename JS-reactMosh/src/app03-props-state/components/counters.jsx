import React, { Component } from 'react'
import Counter from './counter';

class Counters extends Component {
    state = { 
        counters:[
            {id:1, value:1},
            {id:2, value:2},
            {id:3, value:3},
        ]
     } 

     handleDelete = (id) => { 
        console.log(id)
        let counters = this.state.counters.filter(b=> b.id !==id)
        this.setState({counters:counters})
    }
    handleIncrement =(counter) =>{
        const newCounters = [...this.state.counters] // make a copy 
        const index = newCounters.indexOf(counter)
        newCounters[index] = {...counter} // make a copy
        newCounters[index].value ++
        this.setState({counters:newCounters})
     }

    render() { 
        return (
            this.state.counters.map(c=>{
                return (
                    <Counter key={c.id} onDelete={()=>this.handleDelete(c.id)} onIncrement={()=>this.handleIncrement(c)} value={c.value}/>
                )
            })
        );
    }
}
 
export default Counters;