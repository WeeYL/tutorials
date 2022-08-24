
const jwt = require('jsonwebtoken')
const config = require('config')

const mongoose = require("mongoose");

// set schema
const MySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
      unique:true
    },
    password: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 256,
    },


    isAdmin:{
      type:Boolean,
      default:false
    },

  });
  
  // Add methods to schema. Sign the information to pass on to
  MySchema.methods.generateAuthToken = function() {
    return jwt.sign({_id:this.id, isAdmin:this.isAdmin}, config.get('jwtPrivateKey'))
  };

  // set Object
  const MyModel = mongoose.model("users", MySchema); 


module.exports = {MyModel}