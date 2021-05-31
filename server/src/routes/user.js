const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("config");
require("dotenv").config({ path: __dirname + "/../../.env" });

/*
 * @route:  /user
 * @desc:   create a jwt for the user
 * @access: public
 */

router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    let user = await User.findOne({
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
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    user = {
      username,
      email,
      password: encryptedPassword,
    };

    await User.create(user);

    user = await User.findOne({
      where: {
        email: email,
      },
    });

    // jwt:
    const payload = {
      user: user.id,
    };

    jwt.sign(
      payload,
      process.env.jwtSecret,
      {
        expiresIn: "1hr",
      },
      (error, token) => {
        if (error) throw error;
        res.status(200).json({
          message: token,
        });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      error: "Server error",
    });
  }
});

/*
 * @route:  /user/login
 * @desc:   authenticate a user
 * @access: public
 */

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(401).json({
        error: "Incorrect credentials",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({
        error: "Incorrect credentials",
      });
    }

    const payload = {
      user: user.id,
    };

    jwt.sign(
      payload,
      process.env.jwtSecret,
      {
        expiresIn: "1hr",
      },
      (error, token) => {
        if (error) throw error;
        res.status(200).json({
          message: token,
        });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      error: "Server error",
    });
  }
});

module.exports = router;
