const { STATUS_CODE } = require("../../../utils/const");
const { httpResponse } = require("../../../utils/response");
const generateCode = require("../services/generateCode");
const Event = require("../models/event.model");
const QRCode = require("qrcode");
const { getUserDetailFromDBByUID } = require("../../../middleware/auth");

module.exports = async (req, res, next) => {
  try {
    // Getting the HostID
    const userId = req.userId;
    const host = await getUserDetailFromDBByUID(userId);

    // Generate a unique code for the event
    const eventCode = generateCode();
    const newEvent = new Event({
      ...req.body,
      host: host._id,
      code: eventCode,
    });
    const result = await newEvent.save();

    // Generate QR code with a placeholder URL
    const qrCodeData = `http://localhost:8000/events/${result._id}/join-event?code=${eventCode}`;
    const qrCodeImage = await QRCode.toDataURL(qrCodeData);

    httpResponse(res, STATUS_CODE.CREATED, "success", {
      ...result._doc,
      qrCode: qrCodeImage,
    });
  } catch (err) {
    return next(new Error(err));
  }
};
