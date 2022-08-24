const { names } = require("debug");
const mongoose = require("mongoose");

const dbName = "embedding";

/*  - embed sub schema into main schema
    - set Model
    - create and save to collection
    - set courseSchema to accept an array of authorList

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


// Course Schema - embed sub schema into main schema
const courseSchema = new mongoose.Schema({
  name: String,
  authorList:  [authorSchema], // [array]
});

// - create Model
const CourseModel = mongoose.model("courses", courseSchema);

// create
async function createCourse(name, authorList) {
  let result = new CourseModel({
    name: name,
    authorList: authorList, // set author with authorSchema. 
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

// addAuthor
async function addAuthor (id,author){
 const course = await CourseModel.findById(id)
 course.authorList.push(author)
 course.save()
 console.log(course)
} 
// removeAuthor
async function removeAuthor (id,authorName){
 const course = await CourseModel.findById(id)

 try {
     const authorIndex = course.authorList.findIndex((n) => n.name === authorName);
     const authorID = course.authorList[authorIndex]._id
     const removed = course.authorList.id(authorID).remove();
     course.save()
     console.log(removed)

 } catch (error) {
     console.log(error.message);
     return;
 }

} 



// run
// createCourse("node", [{name:"YL"},{name:"Jonh"}]); 
// addAuthor('60714df0986c7a36400f35b1',{name:'amy'})
removeAuthor('60714df0986c7a36400f35b1','amy')

