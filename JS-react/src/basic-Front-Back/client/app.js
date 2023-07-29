import React from "react";
import './index.css'
function App() {
  const [data, setData] = React.useState(null);

  // to use CORS, uncomment below

  // React.useEffect(() => {
  //   const api = "http://localhost:3001/api"
  //   fetch(api)
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message));
  // }, []);

  // with Proxy
  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{!data ? "Loading..." : data}</p> 
      </header>
    </div>
  );
}

export default App;

