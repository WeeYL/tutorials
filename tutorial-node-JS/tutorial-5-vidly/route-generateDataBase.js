
const { MyModel: customerModel } = require("./model-customer"); // database
const { MyModel: movieModel } = require("./model-movie"); // database
const { MyModel: genreModel } = require("./model-genre"); // database

// customer

module.exports = async function generate () {
  const customer = new customerModel({
    name: "leony2",
    phone: "123456",
    isGold: true,
  });
  const movie = new movieModel({
    name: "shallow",
    genre:{name: "thriller"},
    numberInStock: 10,
    dailyRentalRate: 5,
  });
  const genre = new genreModel({ name: "thriller" });

  await customer.save();
  await movie.save();
  await genre.save()
}




