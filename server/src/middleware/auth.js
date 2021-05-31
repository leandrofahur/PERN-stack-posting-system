const jwt = require("jsonwebtoken");
require("dotenv").config({ path: __dirname + "/../../.env" });

exports.auth = async (req, res, next) => {
  try {
    const token = req.header("token");

    if (!token) {
      res.status(403).json({
        message: "User not authorized",
      });
    }

    const payload = await jwt.verify(token, process.env.jwtSecret);

    req.user = payload.user;
  } catch (error) {
    console.error(error.message);
    res.status(403).json({
      message: "User not authorized",
    });
  }
};
