import React, {useContext} from 'react'
import {ThemeContext} from './UseContext02-Context'

export default function Component2(){

    const {string} = useContext(ThemeContext)
return(
    <button > {string} </button>
    )
}

