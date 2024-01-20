const Event = require("../models/event.model");
const { httpResponse } = require("../../../utils/response");
const { STATUS_CODE } = require("../../../utils/const");

module.exports = async (req, res, next) => {
  try {
    const events = await Event.find();
    httpResponse(res, STATUS_CODE.OK, "success", { events, auth: req.auth });
  } catch (err) {
    return next(new Error(err));
  }
};
