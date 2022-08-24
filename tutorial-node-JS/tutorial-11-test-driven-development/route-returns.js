const moment = require("moment");
const { MyModel: rentalModel } = require("./model-rental");
const { MyModel: movieModel } = require("./model-movie");
const auth = require("./middleware/auth");
const express = require("express");
const router = express.Router();
router.use(express.json());

router.post("/", auth, async (req, res) => {
  // res.status(401).send('unauthorized. user is not logged in') // use auth middleware

  if (!req.body.customerId)
    return res.status(400).send("customerId not provided");
  if (!req.body.movieId) return res.status(400).send("movieId not provided");

  // populate the rental data
  const rental = await rentalModel.findOne({
    "customer._id": req.body.customerId,
    "movie._id": req.body.movieId,
  });

  // console.log(rental); // returns object

  if (!rental) return res.status(404).send("rental not found");
  if (!rental) return res.status(404).send("rental not found");
  if (rental.dateReturned)
    return res.status(400).send("rental already processed");

  // set a value for date return
  rental.dateReturned = new Date();
  await rental.save();

  // calc rentalFee

  const rentalFee =
    moment().diff(rental.dateOut, "days") * rental.movie.dailyRentalRate; // (current date - dateOut) * rental fee
  rental.rentalFee = rentalFee;
  await rental.save();

  // increase movie stock
  await movieModel.findByIdAndUpdate(
    rental.movie._id,
    {
      $inc: { numberInStock: 1 },
    },
    { new: true }
  );

  return res.status(200).send(rental); // place at the last and send rental body
});

module.exports = router;
