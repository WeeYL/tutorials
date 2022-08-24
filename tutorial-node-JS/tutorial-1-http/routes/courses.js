const express = require("express");
const Joi = require("joi");
const router = express.Router();

router.use(express.json())

// data
const data = [];
let n;
for (n = 1; n < 12; n++) {
  data.push({ id: `${n}`, name: `course${n}` });
}

/* read */
router.get("/", (req, res) => {
  res.send(data);
});

/* create */
router.post("/", (req, res) => {

  //input
  let course = {
    id: data.length + 1,
    name: req.body.name,
  };

  // validate
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const result = schema.validate(req.body);

  // error handling

  if (result.error) {
    const errMsg = result.error.details[0]["message"];
    console.log(errMsg);
    return res.status(400).send(errMsg);
  }

  // commit
  data.push(course);
  res.send(data);
});

/* update */

router.put("/:id", (req, res) => {
  // find courses
  const course = data.find((d) => d.id === req.params.id);
  if (!course) return res.status(404).send("course not found");

  // validate
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  const result = schema.validate(req.body);

  // error handling for body
  if (result.error) {
    const errMsg = result.error.details[0]["message"];
    return res.status(400).send(errMsg);
  }

  // update
  course.name = req.body.name;
  res.send(course);
});

/* delete */

router.delete("/:id", (req, res) => {
  // alternatively is use router.get("/courses/del/:id") to work on

  const course = data.find((d) => d.id === req.params.id);
  if (!course) return res.status(404).send("course not found");

  const index = data.indexOf(course);

  data.splice(index, 1); // delete
  res.send(data); // return in web view
});

// export
module.exports = router;
