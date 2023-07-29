const express = require("express")
const util = require("util")
const redis = require("redis")
const app = express()

// middleware
app.use(express.json())

// setup redis client
const redisURL="redis://127.0.0.1:6379"
const client=redis.createClient()

// setup redis to return a promise
client.set = util.promisify(client.set)
client.get = util.promisify(client.get)

// redis request
// only allows key value pairs
app.post("/",async (req,res)=>{
    const {key,value} = req.body 
    const response = await client.set(key,value) // set the key value in cache
    res.json(response)
})

app.get("/",async (req,res)=>{
    const {key} = req.body 
    const value = await client.get(key) // get the value from key
    res.json(value)
})

// port
app.listen(8080,()=>{
    console.log("listening to port 8080")
})