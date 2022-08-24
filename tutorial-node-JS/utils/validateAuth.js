const Joi = require("joi");

// set schema
const schema = Joi.object({
  email: Joi.string().min(3).max(255).email().required(),
  password: Joi.string().min(3).max(255).required(), // validate input
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
