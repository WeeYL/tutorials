// Note: Load on browser
/* load express
use middleware to run the functions before output.  */

/* load express */
const express = require("express");
const app = express();

/* data */
const courses = [];
Array(1, 2, 3).map((n) => {
  courses.push({ id: n, name: `course${n}` }); // returns [ { id: 1, name: 'course1'}, ...]
});

/* middleware */

// middleware inline call
app.use(function (req, res, next) {
  console.log("logging..."); // returns logging... in console
  next();
});

// middleware call from util folder
const { authenticating } = require("./Authlogger");
app.use(authenticating); // returns authenticating... in console

/* get all courses */
app.get("/courses", (req, res) => {
  res.send(courses);
});

// redirect
app.get("/", (req, res) => {
  res.redirect("http://localhost:3000/courses/");
});

/* listen to port */
const port = 3000;
app.listen(port, () =>
  console.log(`listening to port http://localhost:3000/courses/`)
);
