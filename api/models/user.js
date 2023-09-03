const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  profileImage: String,
  joinDate: {
    type: Date,
    default: Date.now,
  },
  sentFollowRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  receivedFollowRequests: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  verified: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
