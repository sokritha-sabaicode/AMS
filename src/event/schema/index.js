const { eventCreationSchema, eventUpdatingSchema } = require("./event.schema");
const { sessionCreationSchema } = require("./session.schema");

module.exports = {
  eventCreationSchema,
  eventUpdatingSchema,
  sessionCreationSchema,
};
