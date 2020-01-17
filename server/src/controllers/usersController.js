const { validationResult } = require('express-validator');
const UsersController = {};

const User = require('../models/User');
const Profile = require('../models/Profile');

/**
 * @route POST api/users/signup
 * @description Signup
 * @access public
 */
UsersController.signup = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let { firstName, lastName, email, password, password2 } = req.body;

  firstName = firstName.trim();
  lastName = lastName.trim();

  if (password !== password2) {
    return res
      .status(409)
      .json({ errors: [{ msg: 'Passwords does\'t match' }] });
  }

  const userEmail = await User.findOne({ email });

  if (userEmail) {
    return res
      .status(409)
      .json({ errors: [{ msg: 'The email is already in use' }] });
  }

  const newUser = new User({ firstName, lastName, email, password });

  newUser.password = await newUser.encryptPassword(password); // encriptamos
  await newUser
    .save()
    .then(async () => {
      const newProfile = new Profile({ user: newUser._id });
      await newProfile.save();

      return res.status(201).json({
        success: 'You have been successfully registered, you can now login'
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({ errors: [{ msg: 'Server error' }] });
    });
};

/**
 * @route PUT /apu/users/change-password
 * @description Change password by ID
 * @access private
 */
UsersController.changePassword = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let { id } = req.params;
  let { oldPassword, newPassword, newPassword2 } = req.body;

  try {
    const user = await User.findById(id);

    const match = await user.validatePassword(oldPassword);

    if (!match) {
      return res.status(401).json({ errors: [{ msg: 'Incorrect password' }] });
    }

    if (newPassword !== newPassword2) {
      return res
        .status(409)
        .json({ errors: [{ msg: 'Passwords does\'t match' }] });
    }

    newPassword = await user.encryptPassword(newPassword);

    await User.findByIdAndUpdate(id, {
      password: newPassword
    });

    return res.status(200).json({
      success: 'Your has been changed successfully'
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

module.exports = UsersController;
