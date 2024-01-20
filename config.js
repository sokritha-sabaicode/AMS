require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
  FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
};
