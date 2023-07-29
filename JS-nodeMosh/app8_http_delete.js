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
// Delete
app.delete("/courses/:id", (req,res)=>{
  // validations
  const course = courses.find((c) => c.id === parseInt(req.params.id)); // parseInt is used because req.params.id returns as string
  if (!course) return res.status(404).send("course with given id not found!");

  const index = courses.indexOf(course)
  courses.splice(index,1)
  res.send(courses)
})


// PUT
app.put("/courses/:id", (req, res) => {
  // validations
  const course = courses.find((c) => c.id === parseInt(req.params.id)); // parseInt is used because req.params.id returns as string
  if (!course) return res.status(404).send("course with given id not found!");

  const { error } = validateCourse(req.body);
  if (error) return res.send(error.details[0].message);

  // put
  course.name = req.body.name;
  res.send(course);
});
// POST
app.post("/courses", (req, res) => {
  // joi validations
  const { error } = validateCourse(req.body);
  if (error) return res.send(error.details[0].message);

  const course = {
    id: courses.length + 1, // id will be incremental
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

// GET
app.get("/courses/", (req, res) => {
  res.send(courses);
});

app.get("/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id)); // parseInt is used because req.params.id returns as string
  if (!course) return res.status(404).send("course with given id not found!");
  else res.send(course);
});

// LISTEN TO PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening to ${port}`));

// Joi
function validateCourse(body) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(), // body contains name
  });
  return schema.validate(body);
}
