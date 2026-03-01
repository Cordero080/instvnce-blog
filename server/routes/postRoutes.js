const express = require('express');
const router = express.Router();
// This line connects the 'brain' (controller) to the 'path' (route)
const postController = require('../controllers/postController');

// 1. GET ALL POSTS
router.get('/', postController.getAllPosts);

// 2. GET SINGLE POST BY ID
router.get('/:id', postController.getPostById);

// 2. CREATE POST: Logic moved to postController.createPost
router.post('/', postController.createPost);

// Define the PUT path and map it to the updatePost controller
router.put('/:id', postController.updatePost);
// 3. TERMINATE POST: Logic moved to postController.deletePost
router.delete('/:id', postController.deletePost);

module.exports = router;