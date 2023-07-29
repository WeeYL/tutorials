import React, { useEffect, useState } from "react";

/* useEffect returns the effect
based on the dependencies


  // Runs ONCE after initial rendering
    useEffect(() => {
    }, []); 

  // returns function to clear useEffect
    useEffect(() => {
    return ()=>{...}
    }, []); 

  // rendering ONLY IF `prop` or `state` changes
    useEffect(() => {
    }, [prop, state]); 


}

*/

/* renders API */
export function FetchAPI({ resourceType }) {
  const [items, setItems] = useState([]);

  useEffect(
    () => {
      fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
        .then((response) => response.json())
        .then((json) => setItems(json));
      return () => console.log("code return"); // returns function to clear useEffect
    },
    [resourceType] // updates when resource type changes with button clicks
  );

  return (
    <div>
      {items.map((item) => {
        return <p>{JSON.stringify(item)} </p>;
      })}
    </div>
  );
}

/* renders APP */
export default function App() {
  const [resourceType, setResourceType] = useState("users");

  return (
    <div>
      <button
        onClick={() => {
          setResourceType("posts");
        }}
      >
        POSTS
      </button>
      <button
        onClick={() => {
          setResourceType("users");
        }}
      >
        USERS
      </button>
      <button
        onClick={() => {
          setResourceType("comments");
        }}
      >
        COMMENTS
      </button>
      <FetchAPI resourceType={resourceType} />
    </div>
  );
}




  
