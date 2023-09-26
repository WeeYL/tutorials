const print = require("./printHeader");
const express = require("express");

module.exports.connection = function (mongoose,databaseName) {
  // check connection
  mongoose
    .connect(`mongodb://127.0.0.1:27017/${databaseName}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("connected to mongoDB"))
    .catch((err) => console.log("could not connect"));
};

module.exports.createSchema = function (mongoose,name,schema) {
  // create model class and name of class
  // change to singular collection name eg, 'Courses' to 'Course'
  // eg {  name:String,  bio:String,  website:String }
  const Schema = mongoose.model(`${name}`, new mongoose.Schema(schema))
  return Schema
}

module.exports.createModel = async function (SchemaModel,data){
  // eg {  name:"yl", bio:"bio",website:"websites"}
  const createdModel = new SchemaModel (data)
  await createdModel.save()
}

module.exports.findModel = async function(Model,param){
  const results = await Model
    .find()
    .select(`${param}`)
  console.log(results)
}

module.exports.findModelPopulate = async function(Model,ref,param){
  const results = await Model
    .find()
    .populate(`${ref}`)
    .select(`${param}`)
  console.log(results)
}