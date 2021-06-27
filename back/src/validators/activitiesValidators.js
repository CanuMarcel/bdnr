const { body } = require('express-validator');
const { validationResult } = require('express-validator');

const activityValidator = [
  body('activity_type').exists().isString().isIn(['photo', 'post', 'physical']),
  body('title').exists().isString(),  
]

const photoValidator = [
  body('activity_type').equals('photo'),
  body('photo_url').exists().isURL(),
  body('comment').exists().isString(),
]

const postValidator = [
  body('activity_type').equals('post'),
  body('text').exists().isString(),
]

const physicalValidator = [
  body('activity_type').equals('physical'),
  body('physical_activity_type').exists().isString(),
  body('photo_url').isURL().optional(),
  body('duration').isInt().optional(),
  body('distance').isFloat().optional(),
  body('perceived_effort').isInt(),
  body('description').isString(),
]

const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next()
}

module.exports = {
  physicalValidator,
  postValidator,
  photoValidator,
  activityValidator,
  validateResult,
};
