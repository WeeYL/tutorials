/* 
- model-rental.js
- route-rental.js
*/

const express = require("express");
const app = express();
const mongoose = require("mongoose");

/* middleware route*/
const home = require("./route-home");
app.use("/", home);
const genre = require("./route-genre");
app.use("/genre", genre);
const customers = require("./route-customer");
app.use("/customer", customers);
const movie = require("./route-movie");
app.use("/movie", movie);
const rental = require("./route-rental");
app.use("/rental", rental);


// establish mongoDB connection
mongoose
  .connect("mongodb://localhost/tut-5", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to mongoDB"))
  .catch((err) => console.error(err));

  // generate data
  const generate = require('./route-generateDataBase')
  // generate()


  

// get the port. In CMD: set PORT=5000
const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`listening to port http://localhost:${port}`)
);
