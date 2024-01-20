// schemas.js
const Joi = require("joi");

const eventCreationSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  type: Joi.string().required(),
});

const eventUpdatingSchema = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  type: Joi.string(),
  startDate: Joi.date(),
  endDate: Joi.date(),
}).min(1);

module.exports = {
  eventCreationSchema,
  eventUpdatingSchema,
};
