const mongoose = require('mongoose');
const mongooseHelper = require("../mongooseHelper.js")

const catSchema = mongooseHelper.createSchema(mongoose,{
    name:String
})

module.exports = Cat = mongooseHelper.createModel(mongoose,'Cat',catSchema)

