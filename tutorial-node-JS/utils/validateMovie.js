const Joi = require("joi");

// set schema
const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  genre: Joi.string().min(3).max(30).required(),
  numberInStock: Joi.number().min(3).max(100).required(),
  dailyRentalRate: Joi.number().min(1).max(10).required(),
});

// validate
function validate(body) {
  const result = schema.validate(body);

  if (result.error) {
    const errMsg = result.error.details[0]["message"];
    return errMsg;
  }
}

module.exports = validate;
