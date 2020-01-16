const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Profile = require('../models/Profile');

const AuthController = {};

const secret = process.env.SECRET;

// login
AuthController.login = async (req, res) => {
  let { email, password } = req.body;
  let errors = [];
  
  email = email.trim().toLowerCase();

  // validaciones
  if (!email) {
    errors.push({ text: 'Please write an email' });
  }

  if (!password) {
    errors.push({ text: 'Please write a password' });
  }

  // si hubo errores los manda al front
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  // buscamos el email
  const user = await User.findOne({ email });
  
  if (!user) {
    errors.push({ text: 'Email doesn\'t exist, please verify your email' });
    return res.status(404).json({ errors });
  }

  // validamos que la contraseña sea correcta
  const match = await user.validatePassword(password);

  if (!match) {
    errors.push({ text: 'Incorrect password' });
    return res.status(401).json({ errors });
  }

  // creamos y firmamos token
  const token = jwt.sign({ id: user._id, firstName: user.firstName }, secret, {
    expiresIn: 60 * 60 * 24
  });

  await User.findByIdAndUpdate(user._id, { lastActive: new Date() });

  return res.status(201).json({ token });
}

// signup
AuthController.signup = async (req, res) => {
  let { firstName, lastName, email, password, password2 } = req.body;
  const errors = [];

  firstName = firstName.trim();
  lastName = lastName.trim();
  email = email.trim().toLowerCase();

  // validaciones
  if (!firstName) {
    errors.push({ text: "Please write your first name" });
  } else if (firstName.length > 250) {
    errors.push({ text: "Your first name can only have 250 characters" });
  }

  if (!lastName) {
    errors.push({ text: "Please write your last name" });
  } else if (lastName.length > 250) {
    errors.push({ text: "Your last name can only have 250 characters" });
  }

  if (!email) {
    errors.push({ text: "Please write your email" });
  } else if (email.length > 200) {
    errors.push({ text: "Your email can only have 200 characters" });
  }

  if (!password) {
    errors.push({ text: "Please write your password" });
  } else {
    if (password.length < 4) {
      errors.push({
        text: "Your password must contain at least 4 characters"
      });
    } else {
      if (!password2) {
        errors.push({ text: "Please confirm your password" });
      } else {
        if (password !== password2) {
          errors.push({ text: "Passwords do not match" });
        }
      }
    }
  }

  // si hubo errores manda los errores al front
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  // verificamos que el email no se repita
  const userEmail = await User.findOne({ email });

  if (userEmail) {
    errors.push({ text: 'The email is already in use' });

    return res.status(409).json({ errors });
  }

  // creamos un nuevo usuario
  const newUser = new User({ firstName, lastName, email, password });

  newUser.password = await newUser.encryptPassword(password); // encriptamos
  await newUser.save()
  .then(async () => {
    const newProfile = new Profile({ user: newUser._id });
    await newProfile.save();

    return res.status(201).json({ success: 'You have been successfully registered, you can now login' });
  })
  .catch(err => {
      console.log(err);
      return res.status(500).json('Server error');
  });
}

module.exports = AuthController;