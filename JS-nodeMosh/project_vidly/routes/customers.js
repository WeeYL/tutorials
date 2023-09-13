const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')
const Joi = require("joi")

const Customer = require("../models/genres")

// GET
router.get("/", async (req, res) => {
    const customers = await Customer.find().sort('name')
    res.send(customers);
});

// POST
router.post("/",async (req, res) => {

    const error = validateCustomer(req.body)
    if (error) return res.status(400).send(error['error']['details'][0]['message'])
    let customer = new Customer({
        name:req.body.name,
        phone:req.body.phone,
        isGold:req.body.isGold
    })
    customer = await customer.save()
    res.send(customer)
})

// PUT
router.put('/:id', async (req,res)=>{
    const customer = await Customer.findByIdAndUpdate(req.params.id,
        { name:req.body.name },
        { new: true})
    res.send(customer)
})

// DELETE
router.delete('/:id', async (req,res)=>{
    const customer = await Customer.findByIdAndRemove(req.params.id)
    if(!customer) return res.status(404).send("Customer with given Id not found")
    res.send(customer)
})

// FIND
router.get('/:id', async (req,res)=>{
    const customer = await Customer.findById(req.params.id)
    if(!customer) return res.status(404).send("Customer with given Id not found")
    res.send(customer)
})

function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().min(5).required(),
        phone: Joi.string().min(5).required(),
        isGold: Joi.boolean()

    })
    return schema.validate(customer)
}


module.exports = router;
