const express = require('express');
const { check } = require('express-validator');
const router = express();

const userController = require('../controllers/usersController');

router.post(
  '/signup',
  [
    check('firstName', 'Please write your first name').notEmpty(),
    check('lastName', 'Please write your last name').notEmpty(),
    check('email', 'Please write a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 4 or more characters'
    ).isLength({ min: 4 })
  ],
  userController.signup
);

module.exports = router;