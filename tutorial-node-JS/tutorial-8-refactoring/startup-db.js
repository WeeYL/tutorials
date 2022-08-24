const winston = require("winston");
const mongoose = require("mongoose");

// establish mongoDB connection
module.exports = function () {
  mongoose
    .connect("mongodb://localhost/vidly", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => {
      const logger = winston.createLogger({
        transports: [
          new winston.transports.File({
            filename: "./log/info.log",
            level: "info", 
          }),
        ],
      });
      logger.log("info", "MongoDB connected");
    });
};
