const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')
const Joi = require("joi")
const Genre = require("../models/genres")


// GET
router.get("/", async (req, res) => {
    const genres = await Genre.find().sort('name')
    res.send(genres);
});

// POST
router.post("/",async (req, res) => {
    // eg, {"name":"Sports"}
    const error = validateGenre(req.body)
    if (error) return res.status(400).send(error['error']['details'][0]['message'])

    let genre = new Genre({name:req.body.name})
    genre = await genre.save()
    res.send(genre)
})

// PUT
router.put('/:id', async (req,res)=>{
    const genre = await Genre.findByIdAndUpdate(req.params.id,
        { name:req.body.name },
        { new: true})
    res.send(genre)
})

// DELETE
router.delete('/:id', async (req,res)=>{
    const genre = await Genre.findByIdAndRemove(req.params.id)
    if(!genre) return res.status(404).send("Genre with given Id not found")
    res.send(genre)
})

// FIND
router.get('/:id', async (req,res)=>{
    const genre = await Genre.findById(req.params.id)
    if(!genre) return res.status(404).send("Genre with given Id not found")
    res.send(genre)
})

function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })
    return schema.validate(genre)
}

module.exports = router;
