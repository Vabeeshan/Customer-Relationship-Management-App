const router = require("express").Router();
const controller = require("../controllers/note.controller");
const auth = require("../middleware/auth.middleware");

// Create note
router.post("/", auth, controller.createNote);

// Get notes for a lead
router.get("/:leadId", auth, controller.getNotesByLead);

module.exports = router;