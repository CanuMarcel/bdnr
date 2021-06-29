const ActivitiesRepository = require('../repositories/activitiesRepository');
const PointsRepository = require('../repositories/pointsRepository');

class PointsController {
    constructor() {
      this.repository = new PointsRepository();
      this.activities = new ActivitiesRepository();
    }

    async list(req, res, next) {
      const result = await this.repository.listForActivity(req.params.user_id, req.params.activity_timeuuid)
      res.json(result)
    }

    async create(req, res, next) {
      const comment = req.body;
      comment.user_id = req.params.user_id;
      comment.activity_timeuuid = req.params.activity_timeuuid
      const activity = await this.activities.findOne(req.params.user_id, req.params.activity_timeuuid)
      if(!activity) {
        return res.status(404).json({errors: [{param: 'activity_timeuuid', msg: 'Not found'}]})
      }
      const result = await this.repository.create(comment)
      res.json(result)
    }
}

module.exports = PointsController;