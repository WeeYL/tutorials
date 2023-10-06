import { useState, useEffect, useMemo } from "react";

// NOTE USEEFFECT IS THE LAST TO RUN

export default function App() {
  const [name, setName] = useState("")
  const [state, setState] = useState({
    name:"",
    selected:false
  });


  // eg 1, useEffect will always run even if you continuously click Add Name because it is a non-primative (object)
  useEffect(() => {
    console.count("useEffect runs as state has changed")
  }, [state])

  // eg 2, to solve this, useMemo
 
  const user = useMemo(()=>{ return (
    {
      name:state.name,
      selected:state.selected
    }
  )},
  [state.name, state.selected])
  useEffect(() => {
    console.count("useMemo runs as state has changed")
  }, [user])


  // functions
   const handleAdd = ()=> {
    setState(prev=>{
      return {...prev, name:name}
    })
   }
   const handleSelect = ()=> {
    setState(prev=>{
      return {...prev, selected:true}
    })
   }


   
  return (
    <>
      <button onClick={handleAdd}>Add Name</button>
      <button onClick={handleSelect}>Select</button>
      <input style={{ marginLeft: "12px" }} onChange={(e)=>setName(e.target.value)}></input>
      <div> {
        `
        name: ${state.name}
        select: ${state.selected}
        `
        }
      </div>

    </>
  );
}
