const print = require("./printHeader");

///////////////////////////////////////////////////


const express = require("express");
const app = express();
const Joi = require("joi");

// MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// DATA
const courses = [
  { id: 1, name: "web" },
  { id: 2, name: "mobile" },
];

// JOI VALIDATION

app.post("/courses", (req, res) => {
  // joi validations
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  const result = schema.validate(req.body);
  if (result.error) res.status(400).send(result.error.details[0].message);

  // POST
  const course = {
    id: courses.length + 1, // id will be incremental
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

// GET
app.get("/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id)); // parseInt is used because req.params.id returns as string
  if (!course) res.status(404).send("course with given id not found");
  else res.send(course);
});
// LISTEN TO PORT

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening to ${port}`));
