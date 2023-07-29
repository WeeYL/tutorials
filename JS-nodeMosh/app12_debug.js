const print = require("./printHeader");

///////////////////////////////////////////////////

const myMiddleWare = require("./app9_middleware_helper");

const express = require("express");
const app = express();
const Joi = require("joi");
const morgan = require("morgan");
const helmet = require("helmet");
const config = require("config")
const debug = require("debug")("app:startup") // npm i debug. replaces console.log
// MIDDLEWARE 

app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 
app.use(express.static("app9_public")); 
app.use(myMiddleWare); 
app.use(helmet()); 

// environment
console.log(app.get('env'))
if (app.get('env') === "development") {
  app.use(morgan("tiny")); 
  debug('morgan enabled')
  debug("environment: " + config.get("name") )
  } 


// HTTP
app.get("/", (req, res) => {
  res.send("hello world");
});

// LISTEN TO PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening to ${port}`));
