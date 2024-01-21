const Event = require("../models/event.model");
const { httpResponse } = require("../../../utils/response");
const { STATUS_CODE } = require("../../../utils/const");
const { getUserDetailFromDBByUID } = require("../../../middleware/auth");
const { transferError } = require("../../../utils/error");

module.exports = async (req, res, next) => {
  try {
    const userId = req.userId;

    // Get detail user from the database
    const user = await getUserDetailFromDBByUID(userId);

    if (!user) {
      const error = transferError(STATUS_CODE.NOT_FOUND, "User not found");
      return next(new Error(error));
    }

    // Find events where the host field matches the user id
    const events = await Event.find({ host: user._id });

    if (!events) {
      const error = transferError(STATUS_CODE.NOT_FOUND, "Event not found");
      return next(new Error(error));
    }

    httpResponse(res, STATUS_CODE.OK, "success", { events, auth: req.auth });
  } catch (err) {
    return next(new Error(err));
  }
};
