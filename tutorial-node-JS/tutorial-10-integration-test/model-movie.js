/* 
- get genre Schema from genre-model
- cast genre name via route.js
*/

const mongoose = require("mongoose");
const { MySchema: genreSchema } = require("./model-genre");

// set schema
const MySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  genre: { type: genreSchema, required: true }, // - get genre Schema from genre-model
  numberInStock: Number,
  dailyRentalRate: Number,
});

// set Object
const MyModel = mongoose.model("movies", MySchema); //

module.exports = { MyModel };
