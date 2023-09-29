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

module.exports.createModel = function (mongoose,name,schema) {
  // create model class and name of class
  // change to singular collection name eg, 'Courses' to 'Course'
  // eg {  name:String,  bio:String,  website:String }
  const Schema = mongoose.model(`${name}`, schema)
  return Schema
}

module.exports.saveDataToModel = async function (SchemaModel,data){
  // eg {  name:"yl", bio:"bio",website:"websites"}
  const createdModel = new SchemaModel (data)
  console.log(createdModel)
  await createdModel.save()
}



// #######################################################

module.exports.queryGetAll = async function (Model){
  const result = await Model.find()
  console.log(result)
} 

module.exports.updateData = async function (Model,id,newData) {
  const result = await Model.findByIdAndUpdate(
    id,
    {
      $set: newData,// updating
    },
    { new: true } // set new:true = save
  );

  console.log(result);
}

module.exports.removeData = async function(Model,id){

  const result = await Model.findByIdAndRemove(id);
  console.log(result);
}

module.exports.findData= async function(Model,param){
  const results = await Model
    .find()
    .select(`${param}`)
  console.log(results)
}

module.exports.findDataPopulate = async function(Model,ref,param){
  const results = await Model
    .find()
    .populate(`${ref}`)
    .select(`${param}`)
  console.log(results)
}