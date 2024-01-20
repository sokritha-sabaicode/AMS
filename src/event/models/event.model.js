const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true }, // e.g: meeting, class, workshop, etc.
  host: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to User Model
  code: { type: String, required: true, unique: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Array of user IDs
  sessions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
    },
  ],
  startDate: Date,
  endDate: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
});

module.exports = mongoose.model("Event", eventSchema);
