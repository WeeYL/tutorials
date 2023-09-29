import express from 'express'
import {PORT, MERNdbURL} from './config.js'
import mongoose from 'mongoose'
import * as mongooseHelper from "../mongooseHelper.js"
import Cat from '../models/catModel.js'

const app = express()
app.use(express.json()); // is a method inbuilt in express to recognize the incoming Request Object as a JSON Object.

// PORT
app.listen(PORT, () => console.log(`listening to ${PORT} http://localhost:${PORT}`));

// GET
app.get('/',(req,res)=>{ 
    res.send('hello world')
})

app.post('/cats',(req,res)=>{
    try {
        mongooseHelper.saveDataToModel(Cat,{name:req.body.name})
        return res.status(201).send({message:"Success. Data posted"})
    } catch (error) {
        return res.status(404).send({message:error})
    }
})

app.get('/cats',async(req,res)=>{
    try {
        const result = await mongooseHelper.queryGetAll(Cat)
        return res.status(201).send({message:result})
    } catch (error) {
        return res.status(404).send({message:error})
    }
})



// Mongoose
mongooseHelper.connection(mongoose,MERNdbURL)
