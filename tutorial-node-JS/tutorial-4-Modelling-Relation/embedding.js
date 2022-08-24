const { names } = require("debug");
const mongoose = require("mongoose");

const dbName = "embedding";

/*  - embed sub schema into main schema
    - set Model
    - create and save to collection


*/

// establish connection
mongoose
  .connect("mongodb://localhost:27017/" + dbName, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to mongoDB"))
  .catch((err) => console.error(err));

// Author Schema
const authorSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  bio: {
    type: String,
  },
  website: {
    type: String,
  },
});


// Course Schema - embed  > extend course schema to include author schema
const courseSchema = new mongoose.Schema({
  name: String,
  // embedded author with authorSchema
  author: {
    type: authorSchema, 
    required: true,
  },
});

// - set Model

const CourseModel = mongoose.model("courses", courseSchema);

// create
async function createAuthor(name, bio, website) {
  let result = new AuthorModel({
    name: name,
    bio: bio,
    website: website,
  });

  result = await result.save();
  console.log(result);
}

// create
async function createCourse(name, author) {
  let result = new CourseModel({
    name: name,
    author: author, // set author with authorSchema. 
  });

  result = await result.save();
  console.log(result);
}

// update
async function updateCourse(id, name, bio, website) {
  const course = await CourseModel.findById(id);
  const updatedResult = await CourseModel.updateOne(
    { _id: id },
    {
      $set: {
        "author.name": name ? name : course.author.name,
        "author.bio": bio ? bio : course.author.bio,
        "author.website": website ? website : course.author.website,
      },
    }
  );
  console.log(updatedResult);
  console.log(course);
}


// run
// createCourse("node", {name:"YL", bio:"bio",website:"website"});
createCourse("node", {name:"YL", bio:"bio",website:"website"});
// updateCourse("607148af59a29300588a48bf","names");


