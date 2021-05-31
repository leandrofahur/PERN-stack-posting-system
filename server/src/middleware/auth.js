const jwt = require("jsonwebtoken");
require("dotenv").config({ path: __dirname + "/../../.env" });

module.exports = async (req, res, next) => {
  try {
    const token = req.header("token");

    if (!token) {
      return res.status(403).json({
        message: "User not authorized",
      });
    }

    const payload = await jwt.verify(token, process.env.jwtSecret);

    req.user = payload.user;
    next();
  } catch (error) {
    console.error(error.message);
    res.status(403).json({
      message: "User not authorized",
    });
  }
};
