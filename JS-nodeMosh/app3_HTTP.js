const print = require('./printHeader')
///////////////////////////////////////////////////

const express = require("express");
const app = express();
const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("hello");
    res.end();
  }
  if (req.url === "/list") {
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  }
});

server.on("connection", () => {
  console.log("New connection...");
});

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`listening to ${port} http://localhost:3000`)
);

// NOTE: GO TO BROWSER http://localhost:3000/
