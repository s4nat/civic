const userService = require("../services/user.service.js"); // Adjust path as needed

exports.createUser = async (req, res) => {
  try {
    const existingUserByEmail = await userService.findUserByEmail(
      req.body.user_email
    );
    if (existingUserByEmail) {
      return res
        .status(409)
        .json({ message: "❌ User with this email already exists." });
    }

    // Proceed to create user with the unique user ID
    const userData = {
      ...req.body,
    };

    const user = await userService.createUser(userData);
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Error creating user", error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(parseInt(req.params.userId));
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Error retrieving user", error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(
      req.params.userId,
      req.body
    );
    res.json(updatedUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Error updating user", error: error.message });
  }
};

exports.listAllUsers = async (req, res) => {
  try {
    const users = await userService.listAllUsers();
    const response = {"data": users, "num_users": users.length};
    res.json(response);
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Error listing users", error: error.message });
  }
};

exports.getDevicesByUserId = async (req, res) => {
  try {
    const devices = await userService.getDevicesByUserId(req.params.userId);
    res.json(devices);
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Error retrieving devices", error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await userService.deleteUser(req.params.userId);
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Error deleting user", error: error.message });
  }
};

exports.getUserByEmail = async (req, res) => {
  try {
    const user = await userService.findUserByEmail(req.params.email);
    if (user) {
      res.json(user);
    } else {
      return res.status(404).json({ message: "❌ User does not exist." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Error retreiving user", error: error.message });
  }
};
