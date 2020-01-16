const Post = require('../models/Post');

const PostController = {};

PostController.getPosts = async (req, res) => {
  try {
    const posts = await Post.find({ }).populate('user', ['firstName']);
    
    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json('Server error');
  }
};

PostController.addPost = async (req, res) => {
  const { text } = req.body;
  let errors = [];

  if (!text) {
    errors.push('Please write something');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const newPost = new Post({ user: req.userId, text });

  try {
    await newPost.save();
    return res.status(200).json('Post created');
  } catch (error) {
    console.log(error);
    return res.status(500).json('Server error')
  }
};

PostController.deletePost = async (req, res) => {
  const { id } = req.params;
  
  try {
    await Post.findByIdAndDelete(id);
    return res.status(200).json('Post deleted')
  } catch (error) {
    console.log(error);
    return res.status(500).json('Server error')
  }
};

module.exports = PostController;