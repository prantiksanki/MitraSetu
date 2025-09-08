const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String, 
      required: true,
      unique: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // optional: adds createdAt & updatedAt
);

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
