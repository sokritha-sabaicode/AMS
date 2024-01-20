const { STATUS_CODE } = require("../../../utils/const");
const { httpResponse } = require("../../../utils/response");
const UserModel = require("../models/user.model");
const admin = require("../../../utils/firebase");

module.exports = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;

    // Save User to Firebase
    const userCredential = await admin
      .auth()
      .createUser({ email, password, displayName: username });

    // Generate Token
    const token = await admin.auth().createCustomToken(userCredential.uid);

    // Save New User to DB
    const newUser = await UserModel.create({
      userId: userCredential.uid,
      username: userCredential.displayName,
      email: userCredential.email,
      role: role,
    });

    httpResponse(res, STATUS_CODE.CREATED, "success", {
      newUser,
      token,
    });
  } catch (err) {
    return next(new Error(err));
  }
};
