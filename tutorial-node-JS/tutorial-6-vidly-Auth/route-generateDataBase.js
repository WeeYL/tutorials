const { MyModel: customerModel } = require("./model-customer"); // database
const { MyModel: movieModel } = require("./model-movie"); // database
const { MyModel: genreModel } = require("./model-genre"); // database
const { MyModel: userModel } = require("./model-user"); // database

// customer

module.exports = async function generate() {
  const customer = new customerModel({
    name: "leony2",
    phone: "123456",
    isGold: true,
  });
  const movie = new movieModel({
    name: "shallow",
    genre: { name: "thriller" },
    numberInStock: 10,
    dailyRentalRate: 5,
  });
  const genre = new genreModel({ name: "thriller" });
  const user = new userModel({
    name: "YLwee",
    email: "123@123.com",
    password: "123",
    isAdmin: true,
  });
  await customer.save();
  await movie.save();
  await genre.save();
  await user.save();
};
