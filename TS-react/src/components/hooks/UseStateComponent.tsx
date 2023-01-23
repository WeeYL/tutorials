import { useState } from "react";

const UseStateComponent = () =>{
  const [arr, setArr] = useState<number[]>([]);
  const [name, setName] = useState<string | null>(null);

  return (
    <div>
      <div>
        <button onClick={() => setArr([...arr, arr.length + 1])}>
          Add to array
        </button>
        {JSON.stringify(arr)}
      </div>
      <div>
        <button onClick={() => setName("jack")}>Set name</button>
        {JSON.stringify(name)}
      </div>
    </div>
  );
}

export default UseStateComponent;
