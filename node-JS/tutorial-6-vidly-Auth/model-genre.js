/* Set the Genre Schema
From Schema, Create the Genre collection in MongoDB
*/

const mongoose = require("mongoose");

// set schema
const MySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
    },
  });
  
  // set Object
  const MyModel = mongoose.model("genres", MySchema); //

module.exports = {MyModel,MySchema}