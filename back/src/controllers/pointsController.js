const PointsRepository = require('../repositories/pointsRepository');

class PointsController {
    constructor() {
      this.repository = new PointsRepository();
    }

    async list(req, res, next) {
      const result = await this.repository.listForActivity(req.params.activity_user_id, req.params.activity_timeuuid)
      res.json(result)
    }

    async create(req, res, next) {
      const comment = req.body;
      comment.user_id = req.params.activity_user_id;
      comment.activity_timeuuid = req.params.activity_timeuuid
      const result = await this.repository.create(comment)
      res.json(result)
    }
}

module.exports = PointsController;