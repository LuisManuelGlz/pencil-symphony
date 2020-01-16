const { Schema, model } = require('mongoose');

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  avatar: {
    type: String
  },
  bio: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  creationDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = model('profile', ProfileSchema);