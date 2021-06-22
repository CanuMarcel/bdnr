const express = require('express');
const router = express.Router();
const ActivitiesController = require('./activitiesController');
const UsersController = require('./usersController');
const activitiesValidators = require('./activitiesValidators');
const usersValidators = require('./usersValidators');
const activities = new ActivitiesController();
const users = new UsersController();

router.get('/activities', (req, res, next) => activities.listActivities(req, res, next));
router.get('/users', (req, res, next) => users.listUsers(req, res, next));

router.post('/users',
  // usersValidators.userValidator,
 (req, res, next) => users.createUser(req, res, next));

router.post('/pictures',
  activitiesValidators.picturesValidator,
 (req, res, next) => activities.createPicture(req, res, next));

router.post('/publications',
  activitiesValidators.publicationsValidator,
 (req, res, next) => activities.createPublication(req, res, next));

router.post('/manualphysicalactivities',
  activitiesValidators.manualPAValidator,
 (req, res, next) => activities.createManualPA(req, res, next));

router.post('/autophysicalactivities',
  activitiesValidators.autoPAValidator,
 (req, res, next) => activities.createAutoPA(req, res, next));

module.exports = router;