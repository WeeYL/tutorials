const Joi = require("joi");

// set schema
const schema = Joi.object({
  customerId: Joi.string().required(),
  movieId: Joi.string().required(),

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
