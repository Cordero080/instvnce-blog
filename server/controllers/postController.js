const Post = require('../models/Post');

// LOGIC: GET ALL POSTS
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIC: CREATE POST
const createPost = async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  });
  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// LOGIC: TERMINATE POST
const deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.status(404).json({ message: "Instance not found" });
    res.status(200).json({ message: "Instance terminated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Exporting all logic as a single module
module.exports = {
  getAllPosts,
  createPost,
  deletePost
};