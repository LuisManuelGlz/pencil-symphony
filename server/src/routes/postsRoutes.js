const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const { isAuthenticated } = require('../helpers/auth');

const postController = require('../controllers/postsController');

router.get('/', isAuthenticated, postController.getPosts);
router.get('/:id', isAuthenticated, postController.getPost);
router.post(
  '/add',
  [isAuthenticated, [check('text', 'Please write something').notEmpty()]],
  postController.addPost
);
router.delete('/delete/:id', isAuthenticated, postController.deletePost);

module.exports = router;
