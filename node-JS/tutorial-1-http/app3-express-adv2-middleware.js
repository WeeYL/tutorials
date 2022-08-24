// NOTE: only works in POSTMAN localhost:3000

const express = require("express");
const Joi = require("joi");
const app = express();
const { log, authenticating } = require("./Authlogger");
const helmet = require("helmet"); // for security
const morgan = require("morgan"); // display info in terminal for all requests
const config = require("config");

// config
console.log("App Name: " + config.get("name")); // get info from config folder
console.log("mail Name: " + config.get("mail.host"));

// environment
// console.log(`NODE_ENV: ${process.env.NODE_ENV}`); // option 1
console.log(`NODE_ENV: ${config.util.getEnv("NODE_ENV")}`); // option 2
console.log(`app environment: ${app.get("env")}`); // options 3

// middleware
app.use(log);
app.use(authenticating);
app.use(express.static("public")); // folder to store assets. Access with localhost:3000/readme.txt
app.use(helmet());

if (app.get("env") === "development") {
  app.use(morgan("tiny")); // display info in terminal for all requests
  console.log("morgan enabled");
}

// data
const data = [];
let n;
for (n = 1; n < 12; n++) {
  data.push({ id: `${n}`, name: `course${n}` });
}

app.get("/courses/", (req, res) => {
  res.send(data);
});

/* create */
const bp = require("body-parser");
app.use(bp.json);
app.use(bp.urlencoded); // option for x-www-form-urlencded in postman

app.post("/courses/", (req, res) => {
  //input
  let course = {
    id: data.length + 1,
    name: req.body.name,
  };

  console.log(req.body.name);

  // validate
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const result = schema.validate(req.body);

  // error handling

  if (result.error) {
    const errMsg = result.error.details[0]["message"];
    return res.status(400).send(errMsg);
  }

  // commit
  data.push(course);
  res.send(data);
});

/* delete */
app.delete("/courses/:id", (req, res) => {
  const course = data.find((d) => d.id === req.params.id);
  if (!course) return res.status(404).send("course not found");

  const index = data.indexOf(course);

  data.splice(index, 1);
  res.send(data); // return in web view
});

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`listening to port http://localhost:3000/courses/`)
);
