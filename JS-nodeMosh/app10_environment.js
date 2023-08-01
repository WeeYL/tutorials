const print = require("./printHeader");

///////////////////////////////////////////////////

const myMiddleWare = require("./app9_middleware_helper");

const express = require("express");
const app = express();
const Joi = require("joi");
const morgan = require("morgan");
const helmet = require("helmet");
// MIDDLEWARE 

app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 
app.use(express.static("app9_public")); 
app.use(myMiddleWare); 
app.use(helmet()); 
console.log(process.env.NODE_ENV)

// environment
if (app.get('env') === "development") {
  app.use(morgan("tiny")); 
  console.log('morgan enabled')
  } else {
    // in terminal : set NODE_ENV=production
    console.log("morgan disabled")
  }


// HTTP
app.get("/", (req, res) => {
  res.send("hello world");
});

// LISTEN TO PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening to ${port} http://localhost:3000`));
