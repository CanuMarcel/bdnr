const express = require('express');
const router = express.Router();
const ActivitiesController = require('./activitiesController');
const CommentsController = require('./commentsController');
const UsersController = require('./usersController');
const { activityValidator, photoValidator, validateResult, postValidator, physicalValidator} = require('../validators/activitiesValidators');
const usersValidators = require('../validators/usersValidators');
const { oneOf } = require('express-validator');
const commentsValidator = require('../validators/commentsValidator');
const activities = new ActivitiesController();
const comments = new CommentsController();
const users = new UsersController();



router.get('/:user_id/activities', async (req, res, next) => await activities.list(req, res, next));
router.post(
  '/:user_id/activities',
  activityValidator,
  validateResult,
  oneOf([photoValidator, postValidator, physicalValidator]),
  validateResult,
  async (req, res, next) => await activities.create(req, res, next)
)



router.get('/:user_id/activities/:activity_timeuuid/comments', async (req, res, next) => await comments.list(req, res, next))
router.post(
  '/:user_id/activities/:activity_timeuuid/comments',
  commentsValidator.validator,
  commentsValidator.validateResult,
  async (req, res, next) => await comments.create(req, res, next)
)


router.get('/users', (req, res, next) => users.listUsers(req, res, next));
router.post('/users',
  usersValidators.userValidator,
  usersValidators.validateResult,
 (req, res, next) => users.createUser(req, res, next));

module.exports = router;