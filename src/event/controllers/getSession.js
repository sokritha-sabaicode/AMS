const { STATUS_CODE } = require("../../../utils/const");
const { httpResponse } = require("../../../utils/response");
const { getSessionService } = require("../services/session.service");

module.exports = async (req, res, next) => {
  try {
    const session = await getSessionService(req.params.sid);
    httpResponse(res, STATUS_CODE.OK, "success", session);
  } catch (err) {
    return next(new Error(err));
  }
};
