const Joi = require("joi");

const sessionCreationSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow("", null), // Allowing empty string and null
  startTime: Joi.date().required(),
  endTime: Joi.date().required().greater(Joi.ref("startTime")), // Ensure endTime is after startTime
});

module.exports = {
  sessionCreationSchema,
};
