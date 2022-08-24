const Joi = require("joi");

// set schema
const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  phone: Joi.string().min(3).max(30).required(),
  // isAdmin: Joi.boolean().required(),
  isGold: Joi.boolean().required(),
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
