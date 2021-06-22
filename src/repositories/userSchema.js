const mongoose = require('mongoose');
const { Schema } = mongoose;
const { GENDERS, TYPES, PRIVACY, OPTIN, NONBINARY, FREE, PUBLIC } = require('../utils/consts');
 
const userSchema = new Schema({
  name: String,
  // email: {
  //   type: String,
  //   unique: true,
  // },
  // password: String,
  // username: {
  //   type: String,
  //   unique: true,
  //   minLenght: 8,
  // },
  // type: {
  //   type: String,
  //   enum: TYPES,
  //   default: FREE
  // },
  // gender: {
  //   type: String,
  //   enum: GENDERS,
  //   default: NONBINARY
  // },
  // birthdate: Date,
  // latitude: mongoose.Decimal128,
  // longitude: mongoose.Decimal128,
  // height: mongoose.Decimal128,
  // weight: mongoose.Decimal128,
  // privacy: {
  //   type: String,
  //   enum: PRIVACY,
  //   default: PUBLIC
  // },
  // equipment: String,
  // optin: {
  //   type: String,
  //   enum: OPTIN,
  // },
});

module.exports = mongoose.model('User', userSchema, 'users');