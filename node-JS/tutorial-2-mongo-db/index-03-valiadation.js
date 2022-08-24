const mongoose = require("mongoose");

// establish connection
mongoose
  .connect("mongodb://localhost/playground", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to mongoDB"))
  .catch((err) => console.error(err));

// set schema
const courseSchema = new mongoose.Schema({

  // built in validator
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    lowercase: true,
    trim: true,
  },

  // enum validator
  category: {
    type: String,
    required: true,
    enum: ["web", "mob"],
  },

  // uses function to validate. 
  
  price: {
    type: Number,
    min: 10,
    max: 500,
    required: function () {
      console.log("published: " + this.isPublished);
      return this.isPublished; // this refers to the created course
    },

    // get is read from data. set is to write to data
    get: v => Math.round(v),
    set: v => Math.round(v),
  },

  // function validator + message
  tags: {
    type: Array,
    validate: {
      validator: function (v) {
        return v && v.length > 0;
      },
      message: "need at least one tag",
    },
  },

  // async validator, callback returns boolean result
  author: {
      type:String,
      
      validate:{
          isAsync:true,
          validator: function(v,callback){
              setTimeout(()=>{
                   callback(v.length > 3)
              }, 1000)
          },
          message:'needs to be more than 3 letters'
      }
  },

  
  date: Date,
  isPublished: Boolean,
});

// set Object
const Course = mongoose.model("Course", courseSchema);

// create
async function createCourse() {
  const course = new Course({

    // good example
    name: "Flask    ",
    author: 'nana',
    tags: ['null'],
    isPublished: true,
    price: 15.93,
    category: "web",

    // for error
    // name: "Flask     ",
    // author: 'na',
    // tags: null,
    // isPublished: true,
    // price: 15.93,
    // category: "-",

  });

  // valiate
  try {
    const result = await course.save();
    console.log(result);
  } catch (ex) {
      for (n in ex.errors) {
          console.log(ex.errors[n].message);
      }
  }
}

// run
createCourse();
