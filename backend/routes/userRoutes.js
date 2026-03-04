const express = require("express");
const router = express.Router();

const { getAllUsers, deleteUser, updateRole } = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

// Admin routes
router.get("/", protect, adminOnly, getAllUsers);
router.delete("/:id", protect, adminOnly, deleteUser);
router.put("/:id", protect, adminOnly, updateRole);

module.exports = router;