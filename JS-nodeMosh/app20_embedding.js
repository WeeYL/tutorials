const print = require("./printHeader");
const mongooseHelper = require("./mongooseHelper");
const express = require("express");
//const app = express();

const mongoose = require("mongoose");

// check connection
mongooseHelper.connection(mongoose, "db_app20");
// create schema
const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

// Embed author schema
const courseSchema = new mongoose.Schema({
  name: String,
  author: {
    type: authorSchema,
    required: true,
  },
});

const Author = mongooseHelper.createModel(mongoose, "Author", authorSchema);
const Course = mongooseHelper.createModel(mongoose, "Course", courseSchema);

// save model

// const createCourse = mongooseHelper.saveDataToModel(Course,{
//   name:"node",
//   author: new Author({name:"Leon"})
// });

mongooseHelper.findData(Course, "name author.name");
mongooseHelper.updateData(Course,"65127b3c7d40e226ecc63efa",{author:{name:"Gunn"}})
mongooseHelper.findDataPopulate(Course, "author", "name author");
