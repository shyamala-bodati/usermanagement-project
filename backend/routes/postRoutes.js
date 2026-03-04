const express = require("express");
const router = express.Router();

const { 
  createPost, 
  getMyPosts, 
  getAllPosts, 
  deletePost,
  updatePost
} = require("../controllers/postController");


const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

// Employee
router.post("/", protect, createPost);
router.get("/my", protect, getMyPosts);

// Admin
router.get("/all", protect, adminOnly, getAllPosts);
router.put("/:id", protect, updatePost);

// Delete
router.delete("/:id", protect, deletePost);

module.exports = router;