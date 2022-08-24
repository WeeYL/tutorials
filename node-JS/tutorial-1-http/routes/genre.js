const express = require("express");
const router = express.Router();
const validate = require("../utils/validate");

router.use(express.json())

const data = [
  { id: 1, name: "Action" },
  { id: 2, name: "Horror" },
  { id: 3, name: "Romance" },
];

/* read */
router.get("/", (req, res) => {
  res.send(data);
});

/* create */
router.post("/", (req, res) => {
  console.log(req.body.name);

  //input
  let genre = {
    id: data.length + 1,
    name: req.body.name,
  };

  // error handling
  const error = validate(req.body);
    if (error) {
    return res.status(404).send(error);
  }

  // commit
  data.push(genre);
  res.send(data);
});



/* update */
router.put("/:id", (req, res) => {

  const genre = data.find((d) => d.id === req.params.id);
  if (!genre) return res.status(404).send("genre not found");

  // error handling
  const error = validate(req.body);
    if (error) {
    return res.status(404).send(error);
  }

  // update
  genre.name = req.body.name;
  res.send(genre);
});

/* delete */

router.delete("/:id", (req, res) => {
  // alternatively is use router.get("/genres/del/:id") to work on

  const genre = data.find((d) => d.id === req.params.id);
  if (!genre) return res.status(404).send("genre not found");

  const index = data.indexOf(genre);

  data.splice(index, 1); // delete
  res.send(data); // return in web view
});



/* exports */
module.exports = router;
