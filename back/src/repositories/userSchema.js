const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;
const { GENDERS, TYPES, PRIVACY, OPTIN, NONBINARY, FREE, PUBLIC } = require('../utils/consts');
 
const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: {
    type:String,
  },
  username: {
    type: String,
    unique: true,
    minLenght: 8,
  },
  type: {
    type: String,
    enum: TYPES,
    default: FREE
  },
  gender: {
    type: String,
    enum: GENDERS,
    default: NONBINARY
  },
  birthdate: Date,
  latitude: mongoose.Decimal128,
  longitude: mongoose.Decimal128,
  height: mongoose.Decimal128,
  weight: mongoose.Decimal128,
  privacy: {
    type: String,
    enum: PRIVACY,
    default: PUBLIC
  },
  equipment: [String],
  optin: {
    type: String,
    enum: OPTIN,
  },
});

userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model('User', userSchema, 'users');