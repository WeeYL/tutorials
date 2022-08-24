require("express-async-errors");
const winston = require("winston");

// uncaught errors
module.exports = function () {
  winston.createLogger({
    exceptionHandlers: [
      new winston.transports.File({ filename: "./log/exceptions.log" }),
    ],
  });
};
