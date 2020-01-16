const Profile = require('../models/Profile');

const ProfileController = {};

ProfileController.myProfile = async (req, res) => {
  const profile = await Profile.findOne({ user: req.userId }).populate('user', ['firstName']);

  if (!profile) {
    return res.status(500).json('Server error');
  }

  return res.status(200).json(profile);
};

ProfileController.editProfile = async (req, res) => {
  const { bio, website, location } = req.body;

  await Profile.findOneAndUpdate({ user: req.userId }, { bio, website, location })
  .then(() => {
    return res.status(200).json('Your profile has been updated');
  })
  .catch(error => {
    return res.status(500).json('Server error');
  });
};

ProfileController.avatar = async (req, res) => {
  // return res.json('Ok');
  console.log(req.host);
};

module.exports = ProfileController;