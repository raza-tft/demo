const User = require("../models/User");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email, password });

    console.log(email, password);
    if (!user) {
      user = await User.create({ email, password, name: "Guest" });
    }
    return res.json({
      success: true,
      message: "Logged in successfully",
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Failed to login",
      error: error.message,
    });
  }
};

module.exports = {
  login,
};
