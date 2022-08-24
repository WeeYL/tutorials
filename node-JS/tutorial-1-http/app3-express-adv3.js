// NOTE: only works in POSTMAN localhost:3000
// set environment in terminal for production: $env:NODE_ENV="production"

const express = require("express");
const Joi = require("joi");
const app = express();
const { log, authenticating } = require("./Authlogger");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");
const courses = require("../routes/courses");
const genre = require("../routes/genre");
const home = require("../routes/home");

/* config */
console.log("App Name: " + config.get("name")); // read from config folder based on environment
console.log("mail Name: " + config.get("mail.host"));

/* environment */
// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);          // option 1
console.log(`NODE_ENV: ${config.util.getEnv("NODE_ENV")}`); // option 2
// console.log(`app environment: ${app.get('env')}`);            // option 3

/* middleware */
app.use("/genre", genre);
app.use("/courses", courses); // any routes that uses "/courses", go to courses
app.use("/", home); // any routes that uses "/home", go to home
app.use(log);
app.use(authenticating);
app.use(express.static("utils")); // localhost:3000/readme.txt
app.use(helmet());

/* environment status */
if (app.get("env") === "development") {
  app.use(morgan("tiny")); // display info in terminal for all requests
  console.log("morgan enabled");
}

// get the port. In CMD: set PORT=5000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening to port localhost:${port}`));
