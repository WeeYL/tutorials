const print = require("./printHeader");
const mongooseHelper = require("./mongooseHelper");
const express = require("express");
//const app = express();

const mongoose = require("mongoose");

// check connection
mongooseHelper.connection(mongoose, "db_app19");
// create schema
const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const courseSchema = new mongoose.Schema({
  name: String,
  // reference to Id and collection
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
  },
});

const Author = mongooseHelper.createModel(mongoose, "Author", authorSchema);
const Course = mongooseHelper.createModel(mongoose, "Course", courseSchema);

// mongooseHelper.saveDataToModel(Author, {
//   name: 'leon',
//   bio: 'bioLeon',
//   website: 'websitesLeon',
// })

// mongooseHelper.saveDataToModel(Course, {
//   name: "react",
//   author: "651e08f1d2ce7f0e1cf8aa46",
// });

mongooseHelper.findData(Author, "name");
mongooseHelper.findData(Course, "name");
mongooseHelper.findDataPopulate(Course, "author", "name author");
