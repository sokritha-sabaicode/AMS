const { STATUS_CODE } = require("../../../utils/const");
const { httpResponse } = require("../../../utils/response");
const { createNewSessionService } = require("../services/session.service");

module.exports = async (req, res, next) => {
  try {
    const newSession = await createNewSessionService(req.params.eid, req.body);

    httpResponse(res, STATUS_CODE.CREATED, "success", newSession);
  } catch (err) {
    return next(new Error(err));
  }
};
