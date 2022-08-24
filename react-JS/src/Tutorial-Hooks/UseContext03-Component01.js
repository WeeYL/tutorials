import React, {useContext} from 'react'
import { NumberContext, NumberIncreaseContext } from './UseContext03-context'


export default function MyComponent(){
    
    const value = useContext(NumberContext)
    const increase = useContext(NumberIncreaseContext)



    return (
        <div>
            <button onClick={increase}>increase</button>
            {value}
        </div>
    )
}