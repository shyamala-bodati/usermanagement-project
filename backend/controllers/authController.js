const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// ================= REGISTER =================
exports.register = async (req, res) => {
  try {
    const { name, password, adminCode } = req.body;

    // 🔥 Normalize email
    const email = req.body.email.trim().toLowerCase();

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const ADMIN_SECRET = process.env.ADMIN_SECRET || "admin123";

    let role = "employee";
    if (adminCode && adminCode === ADMIN_SECRET) {
      role = "admin";
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    res.status(201).json({
      message: "Registration successful",
      user
    });

  } catch (error) {
    console.log("REGISTER ERROR:", error);
    res.status(500).json({ message: "Registration failed" });
  }
};


// ================= LOGIN =================
exports.login = async (req, res) => {
  try {

    const password = req.body.password;
    const email = req.body.email.trim().toLowerCase();

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: "Invalid password" });
    }

    user.loginCount = (user.loginCount || 0) + 1;
    user.lastLogin = new Date();
    await user.save();

    const JWT_SECRET = process.env.JWT_SECRET || "secret123";

    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      user
    });

  } catch (error) {
    console.log("LOGIN ERROR:", error);
    res.status(500).json({ message: "Login failed" });
  }
};


// ================= FORGOT PASSWORD =================
exports.forgotPassword = async (req, res) => {
  try {
    const email = req.body.email.trim().toLowerCase();

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");

    user.resetPasswordToken = resetToken;
user.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

    await user.save();

    res.json({
      message: "Reset link generated",
      token: resetToken
    });

  } catch (error) {
    res.status(500).json({ message: "Forgot password failed" });
  }
};


// ================= RESET PASSWORD =================
exports.resetPassword = async (req, res) => {
  try {

    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const newPassword = req.body.password;

    if (!newPassword) {
      return res.status(400).json({ message: "Password is required" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });

  } catch (error) {
    console.log("RESET ERROR:", error);
    res.status(500).json({ message: "Reset failed" });
  }
};