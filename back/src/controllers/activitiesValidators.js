const { body } = require('express-validator');

const picturesValidator = [
  body('userId').isUUID(),
  body('timestamp').isISO8601(),
  body('title').notEmpty(),
  body('url').isURL(),
  body('comment').notEmpty(),
]

const publicationsValidator = [
  body('userId').isUUID(),
  body('timestamp').isISO8601(),
  body('title').notEmpty(),
  body('text').notEmpty(),
]

const manualPAValidator = [
  body('userId').isUUID(),
  body('timestamp').isISO8601(),
  body('title').notEmpty(),
  body('type').notEmpty(),
  body('duration').isInt({min:0}),
  body('distance').isInt({min:0}),
  body('picUrl').isURL(),
  body('description').isString(),
  body('effort').isInt({min:0, max:10}),
]

const autoPAValidator = [
  body('userId').isUUID(),
  body('timestamp').isISO8601(),
  body('title').notEmpty(),
  body('type').notEmpty(),
  body('duration').isInt({min:0}),
  body('distance').isInt({min:0}),
  body('latitude').isLatLong(),
  body('longitude').isLatLong(),
  body('average_speed').isFloat(),
  body('cadence').isFloat().optional(),
  body('calories').isFloat().optional(),
]

module.exports = {
  picturesValidator,
  publicationsValidator,
  manualPAValidator,
  autoPAValidator,
};
