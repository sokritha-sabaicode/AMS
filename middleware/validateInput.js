const Joi = require("joi");
const { transferError } = require("../utils/error");
const { STATUS_CODE } = require("../utils/const");

module.exports = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    const err = transferError(
      STATUS_CODE.BAD_REQUEST,
      error.details[0].message
    );
    return next(new Error(err));
  }
  next();
};
