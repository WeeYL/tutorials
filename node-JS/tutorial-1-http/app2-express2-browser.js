// Note: Load on browser

// load express
const express = require('express')
const app = express();

// body-parser
app.use(express.json())

// data
const courses = []
Array(1,2,3).map(n=>{
    courses.push({id:n, name:`course${n}`}) // [ { id: 1, name: 'course1'}, ...]
})

// get all courses
app.get('/courses',(req,res)=>{
    res.send(courses)
})

// get single course
app.get('/courses/:id', (req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id))
    console.log(req.params.id);
    res.send(course)
})
// delete single course using get
app.get('/courses/del/:id', (req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id))
    console.log(req.params.id);
    const index = courses.indexOf(course)
    courses.splice(index,1)

    res.send(courses)
})


// listen to port
const port = 3000; 
app.listen(port, () => console.log(`listening to port localhost:port`));
  
