const print = require("./printHeader");
const express = require("express");
//const app = express();

const mongoose = require("mongoose");

// check connection
mongoose
  .connect("mongodb://127.0.0.1:27017/playground2", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to mongoDB"))
  .catch((err) => console.log("could not connect"));

// create schema
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: Number,
});

// create model class and name of class
const Course = mongoose.model("myCourse", courseSchema);

// create new class
async function createCourse() {
  const myCourse = new Course({
    name: "python Course",
    author: "python Learner",
    tags: ["flask", "backend"],
    isPublished: true,
    price: 30,
  });

  const result = await myCourse.save();
  print.header("create course");
  console.log(result);
}

async function getCourses() {
  const courses = await Course.find();
  print.header("find all courses");
  console.log(courses);
}
async function filterCourse() {
  const courses = await Course.find({ isPublished: true })
    .sort({ name: 1 }) // 1 is ascending, -1 is descending
    .select({ tags: 1, name: 1 }); // display the columns to display
  print.header("filter courses");
  console.log(courses);
}

async function logicOperator() {
  const courses = await Course.find({ price: { $gte: 11 } }) // greater and equal than
    .sort({ name: 1 }) // 1 is ascending, -1 is descending
    .select({ tags: 1, price: 1 }); // display the columns to display
  print.header("logicOperator");
  console.log(courses);
}

// createCourse() // Do it only once. To create a database, requires to create a class
// getCourses();
// filterCourse();
// logicOperator();
