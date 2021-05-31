const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config({ path: __dirname + "/../../.env" });

exports.registerUser = async (req, res) => {
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
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(401).json("Incorrect credentials");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json("Incorrect credentials");
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
};

exports.verifyUser = async (req, res) => {
  try {
    res.status(200).json(true);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      error: "Server error",
    });
  }
};
