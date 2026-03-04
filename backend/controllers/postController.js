const Post = require("../models/Post");

// CREATE POST
exports.createPost = async (req, res) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      createdBy: req.user.id
    });

    res.status(201).json(post);

  } catch (error) {
    res.status(500).json({ message: "Post creation failed" });
  }
};


// GET MY POSTS
exports.getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ createdBy: req.user.id });
    res.json(posts);

  } catch (error) {
    res.status(500).json({ message: "Fetch failed" });
  }
};


// GET ALL POSTS (ADMIN)
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("createdBy", "name email");
    res.json(posts);

  } catch (error) {
    res.status(500).json({ message: "Fetch failed" });
  }
};


// DELETE POST
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Allow owner or admin
    if (post.createdBy.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not allowed" });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted" });

  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};
// UPDATE POST
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Only owner can edit
    if (post.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    post.content = req.body.content || post.content;

    const updatedPost = await post.save();

    res.json(updatedPost);

  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};