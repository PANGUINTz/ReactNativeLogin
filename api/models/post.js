const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  content: String,
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true},
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  repiles: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      content: {
        type: String,
        require: true,
      },
      createAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
