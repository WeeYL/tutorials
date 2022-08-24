/* 
// customer postman
{name:"Leon",
phone:"123456",
isGold:true}
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
const MyModel = mongoose.model("customer", MySchema);

module.exports = {MyModel}