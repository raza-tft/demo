const User = require("../models/User");

const get = async (req, res) => {
  try {
    const users = await User.find(req.params.id ? { _id: req.params.id } : {});
    return res.json({
      success: true,
      message: `Found ${users.length} users`,
      data: {
        users,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};

const create = async (req, res) => {
  const body = req.body;
  try {
    const user = await User.create(body);
    return res.json({
      message: "User added successfully.",
      success: false,
      data: {
        user,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Couldn't add the user",
      error: error,
    });
  }
};

const update = async (req, res) => {
  const { name } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name: name },
      { new: true }
    );
    return res.json({
      message: "User updated successfully",
      success: true,
      data: { user },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Couldn't add the user",
      error: error,
    });
  }
};

module.exports = {
  get,
  create,
  update,
};
