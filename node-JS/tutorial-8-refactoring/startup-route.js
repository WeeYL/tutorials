require("express-async-errors"); // 
const home = require("./route-home");
const genre = require("./route-genre");
const customers = require("./route-customer");
const movie = require("./route-movie");
const rental = require("./route-rental");
const user = require("./route-user");
const auth = require("./route-auth");
const error = require("./middleware/error"); 

module.exports = function(app){
    app.use("/", home);
    app.use("/genre", genre);
    app.use("/customer", customers);
    app.use("/movie", movie);
    app.use("/rental", rental);
    app.use("/user", user);
    app.use("/auth", auth);
    app.use(error);
}