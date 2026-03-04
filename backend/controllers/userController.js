const User = require("../models/User");

// GET ALL EMPLOYEES (ADMIN)
exports.getAllUsers = async (req, res) => {
  try {

    const users = await User
      .find({ role: "employee" })   // 🔥 Only employees
      .select("-password");

    res.json(users);

  } catch (error) {
    res.status(500).json({ message: "Fetch failed" });
  }
};


// DELETE USER (ADMIN)
exports.deleteUser = async (req, res) => {
  try {

    await User.findByIdAndDelete(req.params.id);

    res.json({ message: "User deleted" });

  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};


// UPDATE ROLE (ADMIN)
exports.updateRole = async (req, res) => {
  try {

    const { role } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    );

    res.json(user);

  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};