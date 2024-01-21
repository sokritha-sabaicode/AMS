const { transferError } = require("../utils/error");
const { STATUS_CODE } = require("../utils/const");
const jwt = require("jsonwebtoken");
const admin = require("../utils/firebase");
const serviceAccount = require("../service-account.json");
const UserModel = require("../src/auth/models/user.model");

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      const error = transferError(
        STATUS_CODE.NOT_AUTHORIZED,
        "You need to signin first!"
      );
      return next(new Error(error));
    }

    const decoded = jwt.verify(token, serviceAccount.private_key);
    const uid = decoded.uid;

    const userRecord = await getUserDetailFromFirebase(uid);

    req.userId = userRecord.uid;
    next();
  } catch (err) {
    console.log("err", err.name);
    // Check if the error is TokenExpiredError
    if (err.name && err.name === "TokenExpiredError") {
      const error = transferError(
        STATUS_CODE.UNAUTHORIZED, // Use an appropriate status code
        "Your session has expired. Please login again."
      );
      return next(new Error(error));
    }

    if (err.errorInfo && err.errorInfo.code === "auth/user-not-found") {
      const err = transferError(STATUS_CODE.NOT_FOUND, `User does not exist!`);
      return next(new Error(err));
    }
    next(new Error(err));
  }
};

const getUserDetailFromFirebase = async (uid) => {
  try {
    const userRecord = await admin.auth().getUser(uid);
    return userRecord;
  } catch (err) {
    throw err;
  }
};

const getUserDetailFromDBByUID = async (uid) => {
  try {
    const user = await UserModel.findOne({ userId: uid });
    return user;
  } catch (err) {
    throw err;
  }
};

const requireRole = (roles) => {
  return async (req, res, next) => {
    try {
      const authenticatedUser = await getUserDetailFromDBByUID(req.userId);

      if (roles.includes(authenticatedUser.role)) {
        next();
      } else {
        const error = transferError(STATUS_CODE.FORBIDDEN, "Unauthorized");
        next(new Error(error));
      }
    } catch (err) {
      next(new Error(err));
    }
  };
};

module.exports = {
  isAuthenticated,
  getUserDetailFromFirebase,
  getUserDetailFromDBByUID,
  requireRole,
};
