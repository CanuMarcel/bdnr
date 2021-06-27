const { validationResult } = require('express-validator');
const ActivitiesRepository = require('../repositories/activitiesRepository');

class ActivitiesController {
    constructor() {
      this.repository = new ActivitiesRepository();
    }

    async listActivities(req, res, next) {
      const result = await this.repository.listAll(req.params.user_id)
      res.json(result)
    }
}

module.exports = ActivitiesController;