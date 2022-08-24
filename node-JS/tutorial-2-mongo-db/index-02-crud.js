/* 
cmd > mongoimport --db mongo-exercises -- collection courses --file exercise-data.json --jsonArray
schema follows imported mongoDB schema
*/

const mongoose = require("mongoose");

// establish connection
mongoose
  .connect("mongodb://localhost/mongo-exercises", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to mongoDB"))
  .catch((err) => console.error(err));

// set schema
const courseSchema = new mongoose.Schema({
  _id: String,
  name: String,
  author: String,
  tags: [String],
  date: Date,
  isPublished: Boolean,
  price: Number,
});

// set Object
const Course = mongoose.model("Course", courseSchema); // collection name

// query
const getCourses = async () => {
  const result = await Course.find();
  console.log(result);
};
// query 2
const getQuery2 = async () => {
  const result = await Course.find()
    .and({ isPublished: true, tags: { $in: ["frontend", "backend"] } })
    .sort("-price")
    .select("author name price");
  console.log(result);
};
// query 3
const getQuery3 = async () => {
  const result = await Course.find()
    .or([{ price: { $gte: 15 } }, { name: /.*by.*/i }])
    .select("author name price");
  console.log(result);
};

// updating option 1
async function updateCourse1(id) {
  const course = await Course.findById(id);

  if (!course) return;
  course.author = "POO"; // updating
  const result = await course.save();
  console.log(result);
}
// updating option 2
async function updateCourse2(id) {
  const course = await Course.findByIdAndUpdate(
    id,
    {
      $set: {author: "Loo"},// updating
    },
    { new: true } // set new:true = save
  );

  console.log(course);
}

// remove document
async function removeCourse(id) {
  const result = await Course.findByIdAndRemove(id);
  console.log(result);
}

// create 
async function createCourse() {
  
  const course = new Course({
    _id:"1",
    name: "Flask",
    author: "Mosh",
    tags: ["Flask", "Backend"],
    isPublished: true,
  });

  const result = await course.save()
  console.log(result);
}

// run
// createCourse() // to create database and create course
// getQuery2()
// getQuery3();
// updateCourse1('5a68fde3f09ad7646ddec17e')
// updateCourse2("5a68fde3f09ad7646ddec17e");
// removeCourse("5a68fe2142ae6a6482c4c9cb");
