/* 
test-rental-returns.test.js 
return.js route
*/

const express = require("express");
const app = express();
const config = require("config");

require("./startup-logging")(); // comes first
require("./startup-route")(app);
require("./startup-db")();

const nodeEnv = config.util.getEnv("NODE_ENV");
console.log("NODE_ENV: ", nodeEnv);
console.log("database: ", config.get("db"));

// get the port. In CMD: set PORT=5000
const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  console.log(`listening to port http://localhost:${port}`)
);

module.exports = server;
