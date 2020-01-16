const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const authController = require('../controllers/authController');

router.post(
  '/login',
  [
    check('email', 'Please write a valid email').isEmail(),
    check('password', 'Please write a password').notEmpty()
  ],
  authController.login
);

module.exports = router;
