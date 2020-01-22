const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const { isAuthenticated } = require('../helpers/auth');

const postsController = require('../controllers/postsController');

router.get('/', isAuthenticated, postsController.getPosts);
router.get('/:id', isAuthenticated, postsController.getPost);
router.put('/like/:id', isAuthenticated, postsController.like)
router.post(
  '/add',
  [isAuthenticated, [check('text', 'Please write something').notEmpty()]],
  postsController.addPost
);
router.delete('/delete/:id', isAuthenticated, postsController.deletePost);

module.exports = router;
