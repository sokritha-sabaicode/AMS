const { STATUS_CODE } = require("../../../utils/const");
const { httpResponse } = require("../../../utils/response");
const Event = require("../models/event.model");
const { getUserDetailFromDBByUID } = require("../../../middleware/auth");
const { transferError } = require("../../../utils/error");

module.exports = async (req, res, next) => {
  try {
    // Getting the Participant ID
    const userId = req.userId;
    const participant = await getUserDetailFromDBByUID(userId);
    const eventId = req.params.eid;
    const givenCode = req.query;

    // Check if event is exist
    const foundEvent = await Event.findById({ _id: eventId });

    if (!foundEvent) {
      const error = transferError(STATUS_CODE.NOT_FOUND, "Event is not found!");
      return next(new Error(error));
    }

    // Validate the Code
    if (foundEvent.code !== givenCode) {
      const error = transferError(
        STATUS_CODE.NOT_FOUND,
        "Code is not correct!"
      );
      return next(new Error(error));
    }

    // Add the Participant to Event
    foundEvent.participants.push(participant._id);
    await foundEvent.save();

    httpResponse(res, STATUS_CODE.CREATED, "success", {
      message: "Joined event successfully",
    });
  } catch (err) {
    return next(new Error(err));
  }
};
