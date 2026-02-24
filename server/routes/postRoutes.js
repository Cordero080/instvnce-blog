const express = require('express'); // Import express to use its built in router
const router = express.Router(); // Initialize the router to handle specific paths
const Post = require('../models/Post'); // Import the Model we made ot talk to DB

// ROUTE TO GET ALL BLOG POSTS

router.get('/', async (req,res) => { //Define get request at the route of this route
  try {
    const posts = await Post.find(); // Tell the Model to find every document in the collection
    res.status(200).json(posts); // Send back the posts with a 200 (success) status code
  } catch  (error) {
    res.status(500).json({ message: error.message }); // send 500 server error and details
  } // Close the catch block

}); // Close the catch block

// ROUTE: CREATE a new blog post
router.post('/', async (req, res) => { // Define a Post request to receive data
  const post = new Post({ // Create a new instance of our post model
    title: req.body.title, // Pull title from the data sent by the frontend
    content: req.body.content, // Pull the content from the data sent by frontend
    author: req.body.author // Pull the 'author' (or use default we set in model)

  }); // Close the post instance

  try {
    const newPost = await post.save(); // wait DB to confirm post is saved
    res.status(201).json(newPost); // Send back the saved ost with a 201 (created) status

  } catch (error) { // If validation fails (e.g. no title)
    res.status(400).json({message: error.message}) // Send 400 (Bad Request) error
  } // Closer the catch block

}); // Close the POST route; 

module.exports = router; // Export these routes so server.js can use them