const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../helpers/auth');

const postController = require('../controllers/postController');

router.get('/', isAuthenticated, postController.getPosts);
router.post('/add', isAuthenticated, postController.addPost);
router.delete('/delete/:id', isAuthenticated, postController.deletePost)

module.exports = router;