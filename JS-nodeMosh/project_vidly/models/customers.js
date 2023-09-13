const mongoose = require('mongoose')
const Joi = require("joi")

const Customer = mongoose.model('Customer', new mongoose.Schema({
    name:{
        type:String, 
        require:true,
        minLength: 5
    },
    phone:{
        type:String, 
        require:true,
        minLength: 5
    },
    isGold:{
        type:Boolean,
        default:false
    },
}))


module.exports = Customer

