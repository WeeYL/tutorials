const print = require("./printHeader");

///////////////////////////////////////////////////

const myMiddleWare = require("./app9_middleware_helper");

const express = require("express");
const app = express();
const Joi = require("joi");
const morgan = require("morgan");
const helmet = require("helmet");
const config = require("config")// npm i config
// MIDDLEWARE 

app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 
app.use(express.static("app9_public")); 
app.use(myMiddleWare); 
app.use(helmet()); 

// environment
console.log(app.get('env'))
if (app.get('env') === "production") {
  app.use(morgan("tiny")); 
  console.log('morgan enabled')
  console.log("environment: " + config.get("name") )
  } 


// HTTP
app.get("/", (req, res) => {
  res.send("hello world");
});

// LISTEN TO PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening to ${port} http://localhost:3000`));
