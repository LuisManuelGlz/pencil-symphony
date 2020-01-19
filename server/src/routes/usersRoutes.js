const express = require('express');
const { check } = require('express-validator');
const router = express();

const usersController = require('../controllers/usersController');
const { isAuthenticated } = require('../helpers/auth');

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
  usersController.signup
);

router.put(
  '/update-account',
  [
    isAuthenticated,
    [
      check('newFirstName', 'Please write your first name').notEmpty(),
      check('newLastName', 'Please write your last name').notEmpty(),
      check('newEmail', 'Please write a valid email').isEmail()
    ]
  ],
  usersController.updateAccount
);

router.put(
  '/change-password',
  [
    isAuthenticated,
    [
      check('oldPassword', 'Please enter your old password').notEmpty(),
      check(
        'newPassword',
        'Please enter your new password with 4 or more characters'
      ).isLength({ min: 4 })
    ]
  ],
  usersController.changePassword
);

module.exports = router;
