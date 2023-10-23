import { useState, useEffect, useMemo } from "react";

// NOTE USEEFFECT IS THE LAST TO RUN

export default function App() {

  // eg 1, useEffect will always run even if you continuously click Add Name because it is a non-primative (object)

  const [state, setState] = useState({
    selected:false
  });

  useEffect(() => {
    console.count("useEffect runs as state has changed")
  }, [state])

  // eg 2, to solve this, useMemo
 
  const [stateMemo, setStateMemo] = useState({
    selected:false
  });

  const user = useMemo(()=>{ return (
    {
      selected:stateMemo.selected
    }
  )},
  [stateMemo.selected])

  useEffect(() => {
    console.count("useMemo runs as state has changed")
  }, [user])


  // functions
   const handleSelect = ()=> {
    setState(prev=>{
      return {...prev, selected:true}
    })
   }


   const handleSelectMemo = ()=> {
    setStateMemo(prev=>{
      return {...prev, selected:true}
    })
   }


   
  return (
    <>
      {console.log(state['selected'])}
      <button onClick={handleSelect}>Select useState { `${(state['selected'])}`}</button>
      <button onClick={handleSelectMemo}>Select useMemo { `${(stateMemo['selected'])}`}</button>
    </>
  );
}
