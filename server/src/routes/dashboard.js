const express = require("express");
const router = express.Router();
const User = require("../models/User");
// const userController = require("../controllers/userController");

const validator = require("../middleware/validator");
const auth = require("../middleware/auth");

/*
 * @route:  /dashboard
 * @desc:
 * @access: private
 */

router.get("/", auth, async (req, res) => {
  try {
    // res.status(200).json(req.user);
    const user = await User.findByPk(req.user);
    res.status(200).json({
      message: user,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      error: "Server error",
    });
  }
});

module.exports = router;
