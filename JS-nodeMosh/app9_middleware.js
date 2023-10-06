const print = require("./printHeader");

///////////////////////////////////////////////////

const myMiddleWare = require("./app9_middleware_helper");

const express = require("express");
const app = express();
const Joi = require("joi");
const morgan = require("morgan");
const helmet = require("helmet");
// MIDDLEWARE https://expressjs.com/en/4x/api.html

app.use(express.urlencoded({ extended: true })); // is a method inbuilt in express to recognize the incoming Request Object as strings or arrays. In postman, choose urlenocded format to send post request
app.use(express.json()); // is a method inbuilt in express to recognize the incoming Request Object as a JSON Object.
app.use(express.static("app9_public")); // post content in the folder. http://localhost:3000/readme.txt
app.use(myMiddleWare); // custom middleware
app.use(helmet()); // Help secure Express apps with various HTTP headers
app.use(morgan("tiny")); // for logging. see terminal for the logging after any http request.

// HTTP
app.get("/", (req, res) => {
  res.send("hello world");
});

// LISTEN TO PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening to ${port} http://localhost:3000`)
  console.log(`listening to ${port} http://localhost:3000/readme.txt`)
});
