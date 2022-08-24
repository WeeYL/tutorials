const express = require("express");
const router = express.Router();
const validate = require("../utils/validateRental");
router.use(express.json());

const MyModelName = "Rental"; //
const { MyModel } = require("./model-rental"); // database
const { MyModel: CustomerModel } = require("./model-customer"); // database
const { MyModel: MovieModel } = require("./model-movie"); // database
const Mongoose = require("mongoose");

/* transaction
fawn two-phase commit
 */
const Fawn = require("fawn");
Fawn.init(Mongoose);

/* read */

router.get("/", async (req, res) => {
  const result = await MyModel.find().select("movie dateOut").sort("-dateOut"); // sort descending
  res.send(result);
});

/* create 
- See validateRental.js
- input and check valid customerId and MovieId
- from customerId and MovieId, GET the information from their database
- Pass the information to the rental model

*/
router.post("/", async (req, res) => {
  // checks
  const error = validate(req.body);
  if (error) return res.status(404).send(error);

  const customer = await CustomerModel.findById(req.body.customerId);
  if (!customer) return res.status(404).send("no such customer");

  const movie = await MovieModel.findById(req.body.movieId);
  if (!movie) return res.status(404).send("no such movie");

  if (movie.numberInStock === 0) return res.status(404).send("Out of stock");

  // create
  let result = new MyModel({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      name: movie.name,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });

  // save option 01
  // result = await result.save();
  // movie.numberInStock--;
  // console.log(movie);
  // movie.save();
  // res.send(result);

  // save option 02 - transaction
  try {
    new Fawn.Task()
      .save("rentals", result)
      .update("movies", { _id: movie._id }, { $inc: { numberInStock: -1 } })
      .run();

    res.send(result);
  } catch (ex) {
    res.status(500).send("error");
  }
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
