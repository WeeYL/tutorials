const { names } = require("debug");
const mongoose = require("mongoose");

const dbName = "tut-7";

/*  - In main SCHEMA, set type and reference model collection
    type: mongoose.Schema.Types.ObjectId, 
    ref: "ref-Model-collection", 

    - in main Model Collection, add reference with Model-id 

    - To query back, use .populate
*/


// establish connection
mongoose
  .connect("mongodb://localhost:27017/" + dbName, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to mongoDB"))
  .catch((err) => console.error(err));

// Author
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

const AuthorModel = mongoose.model("authors", authorSchema);

// Course REFERENCING In main SCHEMA, set type and reference model collection
const courseSchema = new mongoose.Schema({
  name: String,
  author: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "authors", 
  },
});

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

// create in main Model Collection, add reference with Model-id 
async function createCourse(name, author) {
  let result = new CourseModel({
    name: name,
    author: author, // set author
  });

  result = await result.save();
  console.log(result);
}

// query
const getAuthor = async () => {
  const result = await AuthorModel.find();
  console.log(result);
};

// To query back, use .populate
const getCourse = async () => {
  const result = await CourseModel.find().populate('author','name -_id').select('name author') // exclude -_id
  console.log(result);
};

// run
// createAuthor('YL','bio','web');
// createCourse("node", "606efb763b8e6b25e852994c");
// getAuthor();
getCourse();
