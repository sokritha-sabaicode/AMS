const express = require("express");
const validateInput = require("../../middleware/validateInput");
const {
  eventCreationSchema,
  eventUpdatingSchema,
  sessionCreationSchema,
} = require("./schema");
const {
  createEvent,
  getAllEvents,
  getEvent,
  updateEvent,
  deleteEvent,
  createSession,
  getAllSessions,
  getSession,
  joinEvent,
} = require("./controllers");
const { isAuthenticated, requireRole } = require("../../middleware/auth");
const { USER_TYPE } = require("../../utils/const");

const router = express.Router();

// Event
// Permission:
// 1. Host: CRUD Events
// 2. Participant: Get Event
router.get("/", isAuthenticated, requireRole([USER_TYPE.HOST]), getAllEvents);
router.post(
  "/",
  isAuthenticated,
  requireRole([USER_TYPE.HOST]),
  validateInput(eventCreationSchema),
  createEvent
);
router.get(
  "/:id",
  isAuthenticated,
  requireRole([USER_TYPE.HOST, USER_TYPE.PARTICIPANT]),
  getEvent
);
router.patch("/:id", validateInput(eventUpdatingSchema), updateEvent);
router.delete("/:id", deleteEvent);

// Join Event
// Permission:
// 1. Participant: Join Event
router.post(
  "/:eid/join-event",
  isAuthenticated,
  requireRole("participant"),
  joinEvent
);

// Session
// Permission:
// 1. Host: CRUD Sessions
// 2. Participant: Get All Sessions, Get Session
router.post(
  "/:eid/sessions",
  validateInput(sessionCreationSchema),
  createSession
);
router.get("/:eid/sessions", getAllSessions);
router.get("/:eid/sessions/:sid", getSession);

module.exports = router;
