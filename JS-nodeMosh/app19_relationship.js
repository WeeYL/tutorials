const print = require("./printHeader");
const mongooseHelper = require("./mongooseHelper")
const express = require("express");
//const app = express();

const mongoose = require("mongoose");

// check connection
mongooseHelper.connection(mongoose,'db2')
// create schema
const Author = mongooseHelper.createSchema(mongoose,'Author',{
  name:String,
  bio:String,
  website:String
})
const Course = mongooseHelper.createSchema(mongoose,'Course',{
  name:String,
  // reference
  author:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Author"
  }
})

// create model
const createAuthor = mongooseHelper.createModel(Author,{
  name:"yl", bio:"bio",website:"websites"
});
const createCourse = mongooseHelper.createModel(Course,{
  name:"node",author:"65126f30ec64c51a88f6392b"
});
mongooseHelper.findModel(Author,'name')
mongooseHelper.findModel(Course,'name')
mongooseHelper.findModelPopulate(Course,'author','name author')