const express = require('express');
const router = express.Router();
const ActivitiesController = require('./activitiesController');
const CommentsController = require('./commentsController');
const PointsController = require('./pointsController');
const UsersController = require('./usersController');
const { activityValidator, photoValidator, validateResult, postValidator, physicalValidator} = require('../validators/activitiesValidators');
const usersValidators = require('../validators/usersValidators');
const { oneOf } = require('express-validator');
const commentsValidator = require('../validators/commentsValidator');
const pointsValidator = require('../validators/pointsValidator');
const activities = new ActivitiesController();
const comments = new CommentsController();
const points = new PointsController();
const users = new UsersController();


// ACTIVITIES

router.get('/:user_id/activities', async (req, res, next) => await activities.list(req, res, next));
router.post(
  '/:user_id/activities',
  activityValidator,
  validateResult,
  oneOf([photoValidator, postValidator, physicalValidator]),
  validateResult,
  async (req, res, next) => await activities.create(req, res, next)
)


// COMMENTS

router.get('/:user_id/activities/:activity_timeuuid/comments', async (req, res, next) => await comments.list(req, res, next))
router.post(
  '/:user_id/activities/:activity_timeuuid/comments',
  commentsValidator.validator,
  commentsValidator.validateResult,
  async (req, res, next) => await comments.create(req, res, next)
)


// POINTS

router.get('/:user_id/activities/:activity_timeuuid/points', async (req, res, next) => await points.list(req, res, next))
router.post(
  '/:user_id/activities/:activity_timeuuid/points',
  pointsValidator.validator,
  pointsValidator.validateResult,
  async (req, res, next) => await points.create(req, res, next)
)


// USERS

router.get('/users', async (req, res, next) => await users.listUsers(req, res, next));
router.post('/users',
  usersValidators.userValidator,
  usersValidators.validateResult,
 async (req, res, next) => await users.createUser(req, res, next));

module.exports = router;