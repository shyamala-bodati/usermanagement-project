const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },

  role: {
    type: String,
    enum: ["employee", "admin"],
    default: "employee"
  },

  loginCount: { type: Number, default: 0 },
  lastLogin: { type: Date, default: null },

  // 🔥 ADD THESE
  resetPasswordToken: String,
  resetPasswordExpire: Date

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);