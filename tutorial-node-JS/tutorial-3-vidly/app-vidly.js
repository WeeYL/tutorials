/* NOTE: only works in POSTMAN localhost:3000 
Connect to local host
Connect to MongoDB
*/


const express = require("express");
const app = express();
const mongoose = require('mongoose');


/* middleware route*/
const home = require('./route-home')
app.use('/',home)
const genre = require('./route-genre')
app.use('/genre',genre)
const customer = require('./route-customer')
app.use('/customer',customer)

// establish mongoDB connection
mongoose
  .connect('mongodb://localhost/tutorial3', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('connected to mongoDB'))
  .catch((err) => console.error(err));


// get the port. In CMD: set PORT=5000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening to port localhost:${port}`));
