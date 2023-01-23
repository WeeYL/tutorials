import { useState, useContext,createContext } from "react";

// SET THE TYPE
type UserState = {
  first:string 
  last:string
}

// CREATE THE CONTEXT
let UserContext = createContext<UserState>({
  first:"Jane",
  last:"smith"
})

// CONSUMER OF THE CONTEXT
function ConsumerComponent() {
  const user = useContext<UserState>(UserContext);
  return (
    <div>
      <div>First: {user.first}</div>
      <div>Last: {user.last}</div>
    </div>
  );
}

// // USER CONTEXT PROVIDER
function UseContextComponent() {
  const [user, userSet] = useState<UserState>({
    first: "Jane",
    last: "Smith",
  });

  return (
    <UserContext.Provider value={user}>
      <ConsumerComponent />
      <button
        onClick={() =>
          userSet({
            first: "Josie",
            last: "Wales",
          })
        }
      >
        Change context
      </button>
    </UserContext.Provider>
  );
}

export default UseContextComponent;
