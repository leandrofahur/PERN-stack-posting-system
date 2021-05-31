const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

/*
 * @route:  /user
 * @desc:   create a jwt for the user
 * @access: public
 */

router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (user) {
      return res.status(401).json({
        error: "User already exists",
      });
    }

    // ---

    // encryption:

    console.log(password);
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);
    // ---

    await User.create({
      username,
      email,
      password: encryptedPassword,
    });

    res.status(200).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      error: "Server error",
    });
  }
});

module.exports = router;
