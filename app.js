const express = require("express");

const app = express();

// Global Middleware
app.use(express.json());

// Global Route
require("./route")(app);

module.exports = app;
