const print = require("./printHeader");

///////////////////////////////////////////////////


const express = require("express");
const app = express();

// MIDDLEWARE
app.use(express.json());

// DATA
const courses = [
  { id: 1, name: "web" },
  { id: 2, name: "mobile" },
];

// GET
app.get("/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id)); // parseInt is used because req.params.id returns as string
  if (!course) res.status(404).send("course with given id not found");
  else res.send(course);
});

// POST
// in postman http://localhost:3000/courses
// body {"name":"new course"}
app.post("/courses", (req, res) => {
  const course = {
    id: courses.length + 1, // id will be incremental
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

// LISTEN TO PORT

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening to ${port} http://localhost:3000`));
