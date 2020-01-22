const { validationResult } = require('express-validator');

const Post = require('../models/Post');

const PostsController = {};

/**
 * @route GET api/posts
 * @description Get all posts
 * @access private
 */
PostsController.getPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).populate('user', ['firstName', 'avatar']);
    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

/**
 * @route GET api/posts/:id
 * @description Get posts by ID
 * @access private
 */
PostsController.getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id).populate('user', [
      'firstName',
      'avatar'
    ]);

    if (!post) {
      return res.status(404).json({ errors: [{ msg: 'Post not found' }] });
    }

    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: 'Post not found' }] });
  }
};

/**
 * @route POST api/posts/add
 * @description Create a post
 * @access private
 */
PostsController.addPost = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let { text } = req.body;

  text = text.trim();

  const newPost = new Post({ user: req.userId, text });

  try {
    await newPost.save();
    return res.status(200).json('Post created');
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

/**
 * @route PUT api/posts/like/:id
 * @description Like/unlike post
 * @access private
 */
PostsController.like = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);

    if (
      post.likes.filter(like => like.user.toString() === req.userId).length ===
      0
    ) {
      post.likes.unshift({ user: req.userId });
    } else {
      const removeIndex = post.likes
        .map(like => like.user.toString())
        .indexOf(req.userId);

      post.likes.splice(removeIndex, 1);
    }

    await post.save();

    return res.status(200).json(post.likes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
};

/**
 * @route DELETE api/posts/delete/:id
 * @description Delete a post by ID
 * @access private
 */
PostsController.deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    await Post.findByIdAndDelete(id);
    return res.status(200).json('Post deleted');
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

module.exports = PostsController;
