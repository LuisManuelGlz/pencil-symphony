const { Schema, model } = require('mongoose');

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  text: {
    type: String,
    required: true
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    }
  ],
  creationDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = model('Post', PostSchema);