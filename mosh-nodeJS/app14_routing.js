const express = require("express");
const app = express();
const courses = require("./app14_routes/courses")

// HTTP

app.use("/courses/",courses) // all routes in route folder will be appended with "./courses/"

// LISTEN TO PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening to ${port}`));
