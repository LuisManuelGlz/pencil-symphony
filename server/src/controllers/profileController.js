const Profile = require('../models/Profile');

const ProfileController = {};

/**
 * @route GET api/profile/me
 * @description Get current profile
 * @access private
 */
ProfileController.myProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.userId }).populate(
      'user',
      ['firstName', 'avatar']
    );

    return res.status(200).json(profile);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

/**
 * @route GET api/profile/:id
 * @description Get a profile by ID
 * @access private
 */
ProfileController.getProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const profile = await Profile.findById(id).populate('user', [
      'firstName',
      'avatar'
    ]);

    if (!profile) {
      return res.status(404).json({ errors: [{ msg: 'Post not found' }] });
    }

    return res.status(200).json(profile);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: 'Profile not found' }] });
  }
};

/**
 * @route PUT api/posts/edit/:id
 * @description Edit current profile by ID
 * @access private
 */
ProfileController.editProfile = async (req, res) => {
  let { bio, website, location } = req.body;

  bio = bio.trim();
  website = website.trim();
  location = location.trim();

  try {
    await Profile.findOneAndUpdate(
      { user: req.userId },
      { bio, website, location }
    );
    return res.status(200).json('Your profile has been updated');
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

ProfileController.avatar = async (req, res) => {
  // return res.json('Ok');
  console.log(req.host);
};

module.exports = ProfileController;
