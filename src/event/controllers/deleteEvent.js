const Event = require("../models/event.model");
const { transferError } = require("../../../utils/error");
const { STATUS_CODE } = require("../../../utils/const");
const { httpResponse } = require("../../../utils/response");

module.exports = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      const error = transferError(
        STATUS_CODE.NOT_FOUND,
        `Event with this ${req.params.id} not found`
      );
      return next(new Error(error));
    }

    httpResponse(res, STATUS_CODE.NO_CONTENT, "success", event);
  } catch (err) {
    return next(new Error(err));
  }
};
