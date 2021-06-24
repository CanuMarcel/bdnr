const { body } = require('express-validator');
const { GENDERS, TYPES, PRIVACY, OPTIN } = require('../utils/consts');

const userValidator = [
  body('email').isEmail(),
  body('password').isStrongPassword({minSymbols:0}).withMessage('Password must have 8 characters, an uppercase, a lowercase and a number '),
  body('username').isString({min:8}),
  body('type').isIn(TYPES),
  body('gender').isIn(GENDERS),
  body('birthdate').isISO8601(),
  body('latitude').isFloat(),
  body('longitude').isFloat(),
  body('height').isFloat(),
  body('weight').isFloat(),
  body('privacy').isIn(PRIVACY),
  body('equipment'), //check array
  body('optin').isIn(OPTIN),
]

module.exports = {
  userValidator,
};
