const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

/*
 * @route:  /user/register
 * @desc:   create a jwt for the user
 * @access: public
 */

router.post("/register", userController.registerUser);

/*
 * @route:  /user/login
 * @desc:   authenticate a user
 * @access: public
 */

router.post("/login", userController.loginUser);

module.exports = router;
