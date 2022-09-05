import fetch from "node-fetch"

// Basic 

const url = "https://pokeapi.co/api/v2/pokemon/"
fetch(url)
      .then(res => res.json())
      .then(data => { console.log(data['results'][0])
      })

// AWAIT 
// fetch and json() returns a PROMISE hence we use await
