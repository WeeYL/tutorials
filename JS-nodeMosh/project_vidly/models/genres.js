const mongoose = require('mongoose')
const Joi = require("joi")

const Genre = mongoose.model('Genre', new mongoose.Schema({
    name:{
        type:String, 
        require:true,
        minLength: 5
    }
}))


module.exports = Genre
