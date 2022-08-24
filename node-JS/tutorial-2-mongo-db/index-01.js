/* 
create courseSchema blueprint
create course collection model with courseSchema
create document with new collection
run createCourse() to save document and also create the database
*/

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to mongoDB"))
  .catch((err) => console.error(err));

// blue print
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

// model Class
const Course = mongoose.model("Course", courseSchema);

// create
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

// read
const getCourses = async () => { 
    const result = await Course.find(function(){
        console.log('get all courses');
    })
    .limit(10)
    .sort({name:1})
    .select({name:1,tags:1}) // 1: include 0: exclude
    // .select('name tags') // option 2
    console.log(result);
}

// query
const getCoursesLeon = async () => { 
    const result = await Course.find({author:/leon/i})
    .select({name:1,author:1})
    console.log(result);
}


/* 
regular expression
.find({author:/^Mosh/})  // starts with
.find({author:/Mosh$/})  // ends with
.find({author:/Mosh$/i})  // ends with + case insensitive
.find({author:/.*Mosh.*})  // contains

*/

/* 
Paginate

.skip((pageNumber-1)*pageSize).limit(pageSize) // paginate
 */



// RUN 
createCourse() // reload data in mongo compass 
// getCourses()
// getCoursesLeon()