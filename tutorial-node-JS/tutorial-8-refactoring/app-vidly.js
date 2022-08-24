const express = require("express");
const app = express();

require("./startup-logging")(); // comes first
require("./startup-route")(app);
require("./startup-db")();

throw new Error("something failed during start up"); // force an uncaught error

// get the port. In CMD: set PORT=5000
const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`listening to port http://localhost:${port}`)
);
