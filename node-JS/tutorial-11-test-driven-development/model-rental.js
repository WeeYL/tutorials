const mongoose = require("mongoose");
const modelName = "rentals";

/* 
Select only the essential ones from schema - movies and customers
Add them to a new schema

*/

// set schema
const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  phone: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  isGold: {
    type: Boolean,
    default: false,
  },
});

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  dailyRentalRate: Number,
});

const mySchema = new mongoose.Schema({
  customer: customerSchema,
  movie: movieSchema,
  dateOut: {
    type: Date,
    default: Date.now,
  },
  dateReturned: Date,
  rentalFee: {
    type: Number,
    min: 0,
  },
});

// set Object
const MyModel = mongoose.model(modelName, mySchema);

module.exports = { MyModel };
