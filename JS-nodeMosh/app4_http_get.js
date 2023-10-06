const print = require('./printHeader')

///////////////////////////////////////////////////
//https://expressjs.com/en/4x/api.html

const express = require("express");
const app = express();


// GET
app.get("/", (req, res) => {
  // '/' path and routehandler
  res.send("hello world");
});

// SUB
app.get("/list", (req, res) => {
  res.send([1, 2, 3]);
});

// PARAMS.

app.get("/params/:id", (req, res) => {
  res.send(req.params.id); // RETURNS AN INTEGER
});

// PARAMS.
app.get("/params/:year/:month", (req, res) => {
  res.send(req.params); // RETURNS AN OBJECT
});


// PRODUCTION PORT IS DYNAMIC BY THE HOSTING ENVIRONMENT

const port = process.env.PORT || 3000;
app.listen(port, () =>{
  console.log(`listening to ${port} http://localhost:3000`)
  console.log(`listening to ${port} http://localhost:3000/params/21`)
  console.log(`listening to ${port} http://localhost:3000/params/2018/1`)
}
);
