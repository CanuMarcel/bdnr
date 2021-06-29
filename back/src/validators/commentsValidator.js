const { body, param } = require('express-validator');
const { validationResult } = require('express-validator');

const validateResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next()
}


const validator = [
    param('activity_user_id').exists().isString(),
    param('activity_timeuuid').exists().isUUID(),
    body('user_id').exists().isString(), 
    body('text').exists().isString(),
]
  
module.exports = {
    validator,
    validateResult
}