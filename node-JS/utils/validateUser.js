const Joi = require("joi");

// set schema
const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().min(3).max(255).email().required(),
  password: Joi.string().min(3).max(255).required(), // validate input
  isAdmin: Joi.boolean(), // validate input

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
