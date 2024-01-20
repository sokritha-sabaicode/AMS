const { STATUS_CODE } = require("../../../utils/const");
const { httpResponse } = require("../../../utils/response");
const admin = require("../../../utils/firebase");
const { FIREBASE_API_KEY } = require("../../../config");
const axios = require("axios");
const { transferError } = require("../../../utils/error");

const apiKey = FIREBASE_API_KEY;

module.exports = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const VERIFY_PASSWORD_ENDPOINT = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

    const response = await axios.post(VERIFY_PASSWORD_ENDPOINT, {
      email,
      password,
    });

    if (parseInt(response.status.toString()) === 200) {
      const userId = response.data.localId ?? null;

      const token = await admin.auth().createCustomToken(userId);

      httpResponse(res, STATUS_CODE.CREATED, "success", {
        message: "Signin successful!",
        token,
      });
    }
  } catch (err) {
    console.log("err", err.response.status);
    if (err.response.status === 400) {
      const error = transferError(
        STATUS_CODE.NOT_AUTHORIZED,
        "Email and Password is not correct!"
      );
      next(new Error(error));
    }
    return next(new Error(err));
  }
};
