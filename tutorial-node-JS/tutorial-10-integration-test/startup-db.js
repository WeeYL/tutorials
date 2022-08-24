const winston = require("winston");
const mongoose = require("mongoose");
const config = require("config");
const db = config.get('db')
// const db ="mongodb://localhost/vidly_test"

// establish mongoDB connection
module.exports = function () {
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      // useUnifiedTopology: true,
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
      logger.log("info", "MongoDB connected",db);
    });
};
