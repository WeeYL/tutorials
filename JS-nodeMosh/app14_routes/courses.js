const express = require("express");
const router = express.Router();

// DATA
const courses = [
  { id: 1, name: "web" },
  { id: 2, name: "mobile" },
];

// GET
router.get("/", (req, res) => {
  res.send(courses);
});

router.get("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id)); // parseInt is used because req.params.id returns as string
  if (!course) return res.status(404).send("course with given id not found!");
  else res.send(course);
});

module.exports = router;
