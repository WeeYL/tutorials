const express = require("express")
const axios = require('axios')
const util = require("util")
const redis = require("redis")
const app = express()

// middleware
app.use(express.json())

// setup redis client
const redisURL="redis://127.0.0.1:6379"
const placeHolderUrl="https://jsonplaceholder.typicode.com/posts"
const client=redis.createClient()

// setup redis to return a promise
client.set = util.promisify(client.set)
client.get = util.promisify(client.get)

// redis request
// only allows key value pairs

app.get("/posts/:id",async (req,res)=>{
    const {id} = req.params 

    // check and get cached post
    const cachedPost = await client.get(`post-${id}`)

    if (cachedPost) {
        console.log("getting from cache...")
        res.json(JSON.parse(cachedPost)) // parse the json
    } else {
        // set into cache and set expiry
        console.log("setting to cache...")
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        client.set(`post-${id}`, JSON.stringify(response.data), "EX", 5) // stringify the response data
        return res.json(response.data)
    }
})


// })

// port
app.listen(8080,()=>{
    console.log("listening to port 8080")
})