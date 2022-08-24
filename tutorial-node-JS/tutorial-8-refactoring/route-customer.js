const express = require("express");
const router = express.Router();
const validate = require("../utils/validateCustomer");
router.use(express.json());

const MyModelName = "Customer";
const {MyModel} = require('./model-customer') // database

/* read */

router.get("/", async (req, res) => {
  const result = await MyModel.find();
  res.send(result);
});

/* create */
router.post("/", async (req, res) => {
  let result = new MyModel({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });
  result = await result.save();

  // error handling
  const error = validate(req.body);
  if (error) {
    return res.status(404).send(error);
  }

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
      $set: {
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold,
      },
    },
    { new: true }
  );
  if (!result) return res.status(404).send(MyModelName, " not found");

  // display
  res.send(result);
});

/* delete */

router.delete("/:id", async (req, res) => {
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
