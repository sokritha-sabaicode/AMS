const { STATUS_CODE } = require("../../../utils/const");
const { httpResponse } = require("../../../utils/response");
const { getAllSessionsService } = require("../services/session.service");

module.exports = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const query = {
      page,
      limit,
    };
    const sessions = await getAllSessionsService(query);
    httpResponse(res, STATUS_CODE.CREATED, "success", sessions);
  } catch (err) {
    return next(new Error(err));
  }
};
