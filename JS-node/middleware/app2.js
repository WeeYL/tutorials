const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// without the parser, the req.body from the form (add-product) is undefined
app.use(bodyParser.urlencoded({extended: false}));

// because the url always starts with '/' hence this will always runs
app.use('/', (req, res, next) => {
  console.log('This always runs!');
  next();
});

// define a route
app.use('/add-product', (req, res, next) => {
  res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
});

// and then redirecting 
app.post('/product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

// without next() from prev middleware, the next middleware will not run
app.use('/', (req, res, next) => {
  res.send('<h1>Hello from Express!</h1>');
});

// server listen for event
app.listen(3000,()=>{
    console.log(`click to launch http://localhost:3000/`); 
})