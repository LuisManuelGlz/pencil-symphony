const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const User = require('../models/User');

const AuthController = {};

const secret = process.env.SECRET;

/**
 * @route GET api/auth/test-auth
 * @description Test if user is authenticated
 * @access private
 */
AuthController.testAuth = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.userId, {
      lastActive: new Date()
    }).select('-password');
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

/**
 * @route POST api/auth/login
 * @description Login
 * @access public
 */
AuthController.login = async (req, res) => {
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      errors: [{ msg: "Email doesn't exist, please verify your email" }]
    });
  }

  const match = await user.validatePassword(password);

  if (!match) {
    return res.status(401).json({ errors: [{ msg: 'Incorrect password' }] });
  }

  const token = jwt.sign({ id: user._id, firstName: user.firstName }, secret, {
    expiresIn: 60 * 60 * 24
  });

  try {
    await User.findByIdAndUpdate(user._id, { lastActive: new Date() });
    user.password = undefined;
    return res.status(200).json({ token, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

module.exports = AuthController;
