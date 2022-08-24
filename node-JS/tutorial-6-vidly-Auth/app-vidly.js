/* 
- model-user.js
- route-user.js
- route-auth.js // to apply a one-time token for user em/pwd
- middleware/auth.js for genre

*/


const express = require("express");
const app = express();
const mongoose = require('mongoose');


/* middleware route*/
const home = require('./route-home')
app.use('/',home)
const genre = require('./route-genre')
app.use('/genre',genre)
const customers = require('./route-customer')
app.use('/customer',customers)
const movie = require('./route-movie')
app.use('/movie',movie)
const rental = require('./route-rental') // rental route
app.use('/rental',rental)
const user = require("./route-user"); // user route
app.use("/user", user);
const auth = require("./route-auth"); // auth route
app.use("/auth", auth);

// establish mongoDB connection
mongoose
  .connect('mongodb://localhost/tut-6', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log('connected to mongoDB'))
  .catch((err) => console.error(err));

  // generate database
  const generate = require('./route-generateDataBase')
  generate()
  
// get the port. In CMD: set PORT=5000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening to port http://localhost:${port}`));
