import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'

const App = () => {
  return (
    <Routes>
      <Route path ='/' element={<Home/>}/>
      {/* <Route path ='' element={}/>
      <Route path ='' element={}/> */}

    </Routes>
  )
}

export default App