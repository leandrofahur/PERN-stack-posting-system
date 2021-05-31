const User = require("../models/User");
require("dotenv").config({ path: __dirname + "/../../.env" });

exports.getName = async (req, res) => {
  try {
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
};
