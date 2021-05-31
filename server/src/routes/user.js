const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

const validator = require("../middleware/validator");
const auth = require("../middleware/auth");

/*
 * @route:  /user/register
 * @desc:   create a jwt for the user
 * @access: public
 */

router.post("/register", validator, userController.registerUser);

/*
 * @route:  /user/login
 * @desc:   authenticate a user
 * @access: public
 */

router.post("/login", validator, userController.loginUser);

/*
 * @route:  /user/verify
 * @desc:   authenticate a user
 * @access: private
 */

router.get("/verify", auth, userController.verifyUser);

module.exports = router;
