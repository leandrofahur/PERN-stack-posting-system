const express = require("express");
const router = express.Router();
const User = require("../models/User");
const dashboardController = require("../controllers/dashboardController");

const validator = require("../middleware/validator");
const auth = require("../middleware/auth");

/*
 * @route:  /dashboard
 * @desc:
 * @access: private
 */

router.get("/", auth, dashboardController.getName);

module.exports = router;
