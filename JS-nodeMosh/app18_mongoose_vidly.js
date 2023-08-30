const mongoose = require('mongoose');
const print = require("./printHeader");

// check connection
mongoose
  .connect("mongodb://127.0.0.1:27017/vidly", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to mongoDB"))
  .catch((err) => console.error(err));

// create schema
const customerSchema = new mongoose.Schema({
  name: String,
  phone: String,
  isGold: Boolean,
});

// create model class and name of class
const Course = mongoose.model('vidly', customerSchema);

// create new class
async function createCustomer(){
  const myCustomer = new Course({
      name: 'customer 1',
      phone: '1234',
      isGold: true,
    },
  );

  const result = await myCustomer.save();
  print.header("create course")
  console.log(result)
}

createCustomer()