// first import the json file > go to cmd > mongoimport --db mongo-exercises --collection courses --file app_16_exercise-data.json --jsonArray

const { connection } = require("./mongooseHelper");
const print = require("./printHeader");
const mongoose = require('mongoose');

// check connection and create if not available
connection(mongoose,'mongo-exercises')

// create schema
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: Date,
  isPublished: Boolean,
  price: Number,
});

// create model class and name of class
// change to singular collection name eg, 'Courses' to 'Course'
const Course = mongoose.model("Course", courseSchema); 

// GET ALL COURSES
async function getAllCourses (){
  const result = await Course.find()
  console.log(result)
} 


// GET SORTED
const getSorted = async () => {
  const result = await Course.find()
    .and({ isPublished: true, tags: { $in: ["frontend", "backend"] } })
    .sort("-price") // descending
    .select("author name price");
  console.log(result);
};


// CREATE 
async function createCourse() {
  
  const course = new Course({
    name: "Flask",
    author: "Mosh",
    tags: ["Flask", "Backend"],
    isPublished: true,
  });

  const result = await course.save()
  console.log(result);
}

async function updateCourse(id) {
  const course = await Course.findByIdAndUpdate(
    id,
    {
      $set: {author: "Leon"},// updating
    },
    { new: true } // set new:true = save
  );

  console.log(course);
}

async function removeCourse(id) {
  const result = await Course.findByIdAndRemove(id);
  console.log(result);
}

//RUN

getAllCourses()
// getSorted()
// createCourse()
// updateCourse('64d4a9293355020608b0dd5b')
// removeCourse('64d4a9293355020608b0dd5b')