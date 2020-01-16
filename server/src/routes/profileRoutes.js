const express = require('express');
const router = express.Router();

const profileController = require('../controllers/profileController');
const { isAuthenticated } = require('../helpers/auth');

router.get('/me', isAuthenticated, profileController.myProfile);
router.get('/:id', isAuthenticated, profileController.getProfile);
router.put('/edit', isAuthenticated, profileController.editProfile);
router.get('/avatar/:avatar_id', profileController.avatar);

module.exports = router;
