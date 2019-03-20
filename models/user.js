const mongoose = require('../db/connection');
var uniqueValidator = require('mongoose-unique-validator');
var bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      index: true,
    },
    password: String,
  },
  { timestamps: true }
);

UserSchema.pre('save', function(next) {
  var user = this;
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

//configuring the validator's message to say that the field "is already taken."
UserSchema.plugin(uniqueValidator, { message: 'is already taken.' });

module.exports = UserSchema;
