const mongoose = require("mongoose");


// set schema
const MySchema = new mongoose.Schema({
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
    required: true,
  },

});

// set Object
const MyModel = mongoose.model("Customers", MySchema);

module.exports = {MyModel}