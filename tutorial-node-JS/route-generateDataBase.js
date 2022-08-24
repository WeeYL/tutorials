
const { MyModel: customerModel } = require("./tutorial-7-vidly-errors/model-customer"); // database
const { MyModel: movieModel } = require("./tutorial-7-vidly-errors/model-movie"); // database
const { MyModel: genreModel } = require("./tutorial-7-vidly-errors/model-genre"); // database

// customer

async function generate() {
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

generate();

