const router = require("express").Router();
const logger = require("../utils/logger.js");
const middleware = require("../middleware/auth.middleware.js");
const auth = require("../controllers/auth.Controller.js");

// Start login
logger.log("Login started");
router.get("/login", auth.login);

// Callback from Okta
logger.log("Callback started");
router.get("/callback", auth.callback);

// Check auth
logger.log("Me started");
router.get("/me", middleware, auth.me);

module.exports = router;