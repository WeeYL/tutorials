/* error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6 
run localhost:3000/genre
see mongoDB log
see /log/
*/

const winston = require("winston"); // create winston logger
require("winston-mongodb"); // create winston mongodb
const config = require("config");

module.exports = function (err, req, res, next) {

  /* winston logger */
  const logger = winston.createLogger({
    transports: [
      new winston.transports.File({
        filename: "./log/info.log",
        level: "info", // from level error to info (0-2)
      }),
      new winston.transports.File({
        filename: "./log/errors.log",
        level: "error", // only level error
      }),

      /* see mongoDB log */
      new winston.transports.MongoDB({
        db: config.get("db"),
        // collection: "log",
        level: "error",
        storeHost: true,
        capped: true,
        // metaKey: 'meta'
      }),
    ],
  });

  logger.log("error", err.message);

  /* hardcoded error */
  res.status(500).send("Error");
};
