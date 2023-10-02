import React, {useState, useEffect} from "react";
import axios from "axios";

const url = "http://localhost:5555/cats";


const Home = () => {
  const [cats, setCats] = useState([])

  useEffect(() => {
    axios({
      method: "get",
      url: url,
      _limit: 5,
    })
      .then((res) => setCats(res.data.message))
      .catch((err) => console.log(err));
  }, []);

  console.log(cats)
  return <div>Home 
    {cats.map(c=>{
        return <h1>{c.name}</h1>
    })}

  </div>;
};

export default Home;
