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
      const result = await this.repository.create(activity)
      res.json(result)
    }
}

module.exports = ActivitiesController;