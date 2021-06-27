const { body } = require('express-validator');
const { validationResult } = require('express-validator');
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
  body('equipment'),
  body('optin').notEmpty(),
]

const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.array().forEach(e => {if(e.param === 'password') delete e.value})
    return res.status(400).json({ errors: errors.array() });
  }
}

module.exports = {
  userValidator,
  validateResult,
};
