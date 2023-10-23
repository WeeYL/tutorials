import { useState, useEffect } from "react";

export default function App() {
  const [number, setNumber] = useState(0);
  const [name, setName] = useState("")

  // run when number changes
  useEffect(() => {
    document.title = `clicked ${number} times`;
    console.count("useEfffect runs when number changes");
  }, [number]);

  // runs once
  useEffect(() => {
    document.title = `clicked ${number} times`;
    console.count("useEfffect runs ONCE");
  }, []);

  // component renders
  console.count("component rendered");

  return (
    <>
      <div style={{padding:"12px"}}>
        <button onClick={() => setNumber((prev) => prev + 1)}>increase</button>
        <span style={{ marginLeft: "12px" }}>{number}</span>
        <input style={{ marginLeft: "12px" }} onChange={(e)=>setName(e.target.value)}></input><span style={{paddingLeft:"12px"}}>{name}</span>
      </div>
    </>
  );
}
