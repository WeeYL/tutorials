/* 
- run GET localhost:3000/genre to catch error

- app.js > express-async-errors adds next(ex) if encounter exception to each middleware to reach app.use(error). https://www.npmjs.com/package/express-async-errors 
- app.js > uncaught error

- middleware/error.js > middleware
- middleware/error.js > winston logging error https://github.com/winstonjs/winston error.js
- middleware/error.js > winston mongodb https://www.npmjs.com/package/winston-mongodb
- all error examples are implemented in genre route 

- log > exception, info, error
- mongodb > log
*/

require("express-async-errors"); // 
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const winston = require("winston");

/* uncaught errors use node app.js and uncomment throw new error */
winston.createLogger({
  exceptionHandlers: [
    new winston.transports.File({ filename: "./log/exceptions.log" }),
  ],
});

// throw new Error("something failed during start up"); // force an uncaught error



/* middleware route*/
const home = require("../tutorial-8-refactoring/route-home");
app.use("/", home);
const genre = require("../tutorial-8-refactoring/route-genre");
app.use("/genre", genre);
const customers = require("../tutorial-8-refactoring/route-customer");
app.use("/customer", customers);
const movie = require("../tutorial-8-refactoring/route-movie");
app.use("/movie", movie);
const rental = require("../tutorial-8-refactoring/route-rental");
app.use("/rental", rental);
const user = require("../tutorial-8-refactoring/route-user");
app.use("/user", user);
const auth = require("../tutorial-8-refactoring/route-auth");
app.use("/auth", auth);

const error = require("../tutorial-8-refactoring/middleware/error"); // catch errors
app.use(error);

// establish mongoDB connection
mongoose
  .connect("mongodb://localhost/tut-8", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("connected to mongoDB"))
  .catch((err) => console.error(err));

// get the port. In CMD: set PORT=5000
const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`listening to port http://localhost:${port}`)
);
