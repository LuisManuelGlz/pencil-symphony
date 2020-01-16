const { Schema, model } = require('mongoose');

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  draw: {
    type: String,
    // required: true
  },
  text: {
    type: String,
    required: true
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
      }
    }
  ],
  creationDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = model('post', PostSchema);