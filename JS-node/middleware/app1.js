const express = require('express');
const app = express();

// runs this first
app.use((req, res, next) => {
  console.log('In the middleware!');
  next(); 
});
 // then runs this
app.use((req, res, next) => {
  console.log('In another middleware!');
  res.send('<h1>Hello from Express!</h1>');
});

// server listen for event
app.listen(3000,()=>{
    console.log(`click to launch http://localhost:3000/`); 
})