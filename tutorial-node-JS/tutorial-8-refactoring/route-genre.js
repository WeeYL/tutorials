const express = require("express");
const router = express.Router();
const validate = require("../utils/validate");
const auth = require("./middleware/auth"); // auth
const admin = require("./middleware/admin"); // admin
router.use(express.json());

/* 
create the collection Genre
From the Genre Model
Set the route for CRUD
*/
const MyModelName = "Genre"; //

const { MyModel } = require("./model-genre"); // database

/* read */

router.get("/", async (req, res) => {
  throw new Error('could not find genre') // Force an error
    const result = await MyModel.find();
    res.send(result);
 
});

/* create */
router.post("/", auth, async (req, res) => {

  // error handling
  const error = validate(req.body);
  if (error) {
    return res.status(404).send(error);
  }
  let result = new MyModel({ name: req.body.name });
  result = await result.save();


  res.send(result);
});

/* update */
router.put("/:id", async (req, res) => {
  // error handling
  const error = validate(req.body);
  if (error) {
    return res.status(404).send(error);
  }

  const result = await MyModel.findByIdAndUpdate(
    req.params.id,
    {
      $set: { name: req.body.name },
    },
    { new: true }
  );
  if (!result) return res.status(404).send(MyModelName, " not found");

  // display
  res.send(result);
});

/* delete */

router.delete("/:id", [auth, admin], async (req, res) => {
  const result = await MyModel.findByIdAndRemove(req.params.id);
  if (!result) return res.status(404).send(MyModelName, " not found");

  res.send(result); // return in web view
});

/* get one */

router.get("/:id", async (req, res) => {
  const result = await MyModel.findById(req.params.id);
  if (!result) return res.status(404).send(MyModelName, " not found");

  res.send(result); // return in web view
});

/* exports */
module.exports = router;
