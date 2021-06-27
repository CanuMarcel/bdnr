const ActivitiesRepository = require('../repositories/activitiesRepository');

class ActivitiesController {
    constructor() {
      this.repository = new ActivitiesRepository();
    }

    async list(req, res, next) {
      const result = await this.repository.listForUser(req.params.user_id)
      res.json(result)
    }

    async create(req, res, next) {
      const activity = req.body;
      activity.user_id = req.params.user_id
      const result = await this.repository.create(activity)
      res.json(true)
    }
}

module.exports = ActivitiesController;