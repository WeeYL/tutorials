const { date } = require("joi");
const print = require("./printHeader");
const mongoose = require('mongoose');
const { connection } = require("./mongooseHelper");

// check connection
connection(mongoose,'playground')

// create schema
const courseSchema = new mongoose.Schema({
  author: String,
  date: {
    type:Date,
    default:date.now
  },
  
  // async validator
  isPublished: {
    type:Boolean,
    isAsync:true,
    validate:{
      validator:function(v,callback){
        setTimeout(() => {
          console.log(`isPublished: ${v}`) // TODO
        }, 2000);
      },
      message:"has to be boolean"
    }

  },
  // validate with string requirement
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    lowercase: true, // change string to lower case
    trim: true,
  },
  // validate with enum
  category: {
    type: String,
    required: 'true',
    enum: ["web", "mob"],
  },
  
  // implement validator
  tags: {
    type: Array,
    validate: {
      validator: function (v) {
        return v && v.length > 0; // non-null value && length > 0
      },
      message: "need at least one tag",
    },
  },

  // validate depend on other param
  // if isPublished is true then price is required
  price: {
    type:Number,
    required:function(){ return this.isPublished} 
  },
});

const Course = mongoose.model("Course", courseSchema); 

// CREATE 
async function createCourse() {
  
  const course = new Course({
    name: "Flask",
    author: "Mosh",
    tags: [],
    category:'cloud',
    isPublished: 'true',
  });

  // Save
  try {
    const result = await course.save();
    console.log(result);
  } catch (ex) {
      for (field in ex.errors) {
          console.log(`field: ${field}`)
          console.log(ex.errors[field].message);
      }
  }
}

//RUN
createCourse()
