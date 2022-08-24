const request = require("supertest");
const { MyModel: rentalModel } = require("./model-rental");
const { MyModel: movieModel } = require("./model-movie");
const { MyModel: userModel } = require("./model-user");
const mongoose = require("mongoose");
const moment = require('moment')

// set up
let server;
let movie;
let rental;
let customerId ; // force create an id for reuse
let movieId;
let token;

// execute route-return
async function exec() {

  return await request(server)
    .post("/returns")
    .set("x-auth-token", token) // set header
    .send({ customerId, movieId });
}

// before each op
beforeEach(async () => {
  server = require("./app-vidly");

  // create auth token and Id
  token = new userModel(customerId).generateAuthToken();
  customerId = mongoose.Types.ObjectId()
  movieId = mongoose.Types.ObjectId()

  // set up rental schema
  rental = new rentalModel({
    customer: { _id: customerId, name: "12345", phone: "12345" },
    movie: { _id: movieId, name: "12345", dailyRentalRate: 2 },
  });

  await rental.save();


  // set up movie schema
  movie = new movieModel({
    _id:movieId,
    name: '12345',
    genre: {name:'horror'}, // - get genre Schema from genre-model
    numberInStock: 10,
    dailyRentalRate: 2,
  });

  await movie.save();
});

// after each op
afterEach(async () => {
  await rental.remove({});
  await movie.remove({});
  await server.close();
});

// BASIC test
describe("Basic", () => {
  it("should just work", async () => {
    expect(rental).toMatchObject({
      customer: { name: "12345" },
      movie: { name: "12345" },
    });
  });
});

// GET test
describe("GET", () => {
  it("return status 200", async () => {
    const res = await request(server).get("/rental");

    expect(res.status).toBe(200);
  });
});

// POST test
describe("POST", () => {

  it("return 401 if client is not logged in", async () => {
    // send without token
    token=''
    const res = await exec();

    expect(res.status).toBe(401);
  });

  // it("return 400 if customerId is not provided", async () => {
  //   customerId = ''
  //   const res = await exec()
  //   console.log('customerid',res.body.customerId);
  //   expect(res.status).toBe(400);
  // });

  // it("return 400 if movieId is not provided", async () => {
  //   movieId = ''
  //   const res = await exec()
  //   expect(res.status).toBe(400);
  // });

  it("return 404 if no rental found for customer/movie", async () => {
    await rentalModel.remove({}); // simulate empty database

    const res = await exec();

    expect(res.status).toBe(404);
  });

  it("return 400 if return is already processed", async () => {
    rental.dateReturned = new Date();
    rental.save();
    const res = await exec();

    expect(res.status).toBe(400);
  });

  it("return 200 if request is valid", async () => {
    const res = await exec();

    expect(res.status).toBe(200);
  });

  it("set returnDate if input is valid", async () => {
    const res = await exec(); // a dateReturned is set

    const rentalInDB = await rentalModel.findById(rental._id);   // find by movie id inside rental object. 

    expect(rentalInDB.dateReturned).toBeDefined(); // check that dateReturned is saved
  });

  it("set rental fee for 7 days", async () => {

    rental.dateOut = moment().add(-7,'days').toDate()
    await rental.save()

    const res = await exec(); 

    const rentalInDB = await rentalModel.findById(rental._id); // access the new changes in db
    expect(rentalInDB.rentalFee).toBe(14)

  });

  it("increase movie stock if input is valid ", async () => {

    const res = await exec(); 

    const movieInDB = await movieModel.findById(movieId); // access the new changes in db

    expect(movieInDB.numberInStock).toBe(movie.numberInStock+1)

  });

  it(" return body of response", async () => {

    const res = await exec(); 

    expect(Object.keys(res.body)).toEqual(expect.arrayContaining([
      'customer',
      'movie',
      'dateOut',
      'dateReturned',
      'rentalFee'
    ]))

  });

});


