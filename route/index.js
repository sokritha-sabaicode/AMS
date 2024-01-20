const eventRouter = require("../src/event/route");
const authRouter = require("../src/auth/route");
const { STATUS_CODE } = require("../utils/const");

module.exports = (app) => {

  // Define API
  app.use("/", authRouter);
  app.use("/events", eventRouter);

  // Global Error Handler
  app.use((err, req, res, next) => {
    console.log("Error: ", err);

    const statusCode = err.statusCode || STATUS_CODE.INTERNAL_ERROR;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
      status: "fail",
      message,
    });
  });
};
