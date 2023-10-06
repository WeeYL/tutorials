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


// LISTEN TO PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening to ${port} http://localhost:3000`));

// Joi
function validateCourse(body) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(), // body contains name
  });
  return schema.validate(body);
}
