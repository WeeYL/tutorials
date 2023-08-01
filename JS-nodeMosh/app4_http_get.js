const print = require('./printHeader')

///////////////////////////////////////////////////
//https://expressjs.com/en/4x/api.html

const express = require('express')
const app = express()
// HTTP method
// GET
app.get('/',(req,res)=>{ // '/' path and routehandler
    res.send('hello world')
})

// SUB
app.get('/list',(req,res)=>{
    res.send([1,2,3])
})

// PARAMS. 
// http://localhost:3000/params/21
app.get('/params/:id',(req,res)=>{
    res.send(req.params.id) // RETURNS AN INTEGER
})

// PARAMS. 
// http://localhost:3000/params/2018/1
app.get('/params/:year/:month',(req,res)=>{
    res.send(req.params) // RETURNS AN OBJECT
})

// LISTEN TO PORT
// PRODUCTION PORT IS DYNAMIC BY THE HOSTING ENVIRONMENT

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening to ${port} http://localhost:3000`));
