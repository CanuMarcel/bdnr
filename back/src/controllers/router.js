const express = require('express');
const router = express.Router();
const ActivitiesController = require('./activitiesController');
const UsersController = require('./usersController');
const { activityValidator, photoValidator, validateResult, postValidator, physicalValidator} = require('./activitiesValidators');
const usersValidators = require('./usersValidators');
const { oneOf } = require('express-validator')
const activities = new ActivitiesController();
const users = new UsersController();



router.get('/activities/:user_id', async (req, res, next) => await activities.list(req, res, next));
router.post(
  '/activities',
  activityValidator,
  validateResult,
  oneOf([photoValidator, postValidator, physicalValidator]),
  validateResult,
  async (req, res, next) => await activities.create(req, res, next)
)

router.get('/users', (req, res, next) => users.listUsers(req, res, next));
router.post('/users',
  usersValidators.userValidator,
  usersValidators.validateResult,
 (req, res, next) => users.createUser(req, res, next));

module.exports = router;