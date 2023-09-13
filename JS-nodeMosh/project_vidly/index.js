const express = require("express");
const app = express();
const mongoose = require("mongoose");
const print = require("../printHeader");
const genres = require("./routes/genres");
const customers = require("./routes/customers");

// check connection
mongoose
  .connect("mongodb://127.0.0.1:27017/vidly", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to mongoDB"))
  .catch((err) => console.error(err));

// Route
app.get("/", (req, res) => {
  res.send("hello");
});
app.use(express.json());
app.use("/genres/", genres); // all routes in route folder will be appended with "./genres/"
app.use("/customers/", customers); // all routes in route folder will be appended with "./genres/"

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening to ${port} http://localhost:3000`);
  console.log(`listening to ${port} http://localhost:3000/genres/`);
  console.log(`listening to ${port} http://localhost:3000/customers/`);

});
