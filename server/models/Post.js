const mongoose = require('mongoose');
// The Schema defines the "shape" of each blog post in your database
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A blog post must haver a title'],
    trim: true,
  },
  content: {
    type: String,
    required: [true, 'Blog content cannot be empty'],
  },
  author: {
    type: String,
    default: 'Admin',
  }
}, {
  //This adds "createdAt" and "updatedAt" automatically
  timestamps: true
});

// We turn the blueprint into a "Model" that we can actually use to query the DB
module.exports = mongoose.model('Post', postSchema)