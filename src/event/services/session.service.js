const { STATUS_CODE } = require("../../../utils/const");
const {
  saveDoc,
  updateDocById,
  getAllDocs,
  getDocById,
} = require("../../../utils/db");
const { transferError } = require("../../../utils/error");
const Session = require("../models/session.model");
const QRCode = require("qrcode");

const createNewSessionService = async (eventId, data) => {
  try {
    const sessionData = {
      ...data,
      eventId,
    };
    const resultWithoutQRCode = await saveDoc(Session, sessionData);

    // Generate QR code for the session
    const qrCodeData = `http://localhost:3000/event/${eventId}/sessions/${resultWithoutQRCode._id}`;
    const qrCodeImage = await QRCode.toDataURL(qrCodeData);

    const resultWithQRCode = await updateDocById(
      Session,
      resultWithoutQRCode._id,
      { qrCode: qrCodeImage }
    );

    return resultWithQRCode;
  } catch (err) {
    throw err;
  }
};

const getAllSessionsService = async (query) => {
  try {
    const { page, limit } = query;
    const result = await getAllDocs(Session, page, limit);
    return result;
  } catch (err) {
    throw err;
  }
};

const getSessionService = async (sessionId) => {
  try {
    const session = await getDocById(Session, sessionId);
    if (!session) {
      const error = transferError(
        STATUS_CODE.NOT_FOUND,
        `Session with this ${sessionId} not found`
      );
      throw new Error(error);
    }
    return session;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createNewSessionService,
  getAllSessionsService,
  getSessionService,
};
