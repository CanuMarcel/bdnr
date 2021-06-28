const ActivitiesRepository = require('../repositories/activitiesRepository');
const PointsRepository = require('../repositories/pointsRepository');
const { retrieveStats } = require('../utils/pointUtils');

class ActivitiesController {
    constructor() {
      this.repository = new ActivitiesRepository();
      this.points = new PointsRepository();
    }

    async list(req, res, next) {
      const result = await this.repository.listForUser(req.params.user_id)
      res.json(result)
    }

    async create(req, res, next) {
      const activity = req.body;
      activity.user_id = req.params.user_id
      const result = await this.repository.create(activity)
      res.json(true);
    }

    async finish(req, res, next) {
      const user_id = req.params.user_id;
      const activity_timeuuid = req.params.activity_timeuuid;
      const activity = await this.repository.findOne(user_id, activity_timeuuid);
      if(!activity) {
        return res.status(404).json({'detail': 'Not found'})
      }
      const points = await this.points.listForActivity(user_id, activity_timeuuid);
      const stats = retrieveStats(points);
      const updatedActivity = {...activity, ...stats};
      await this.repository.update(updatedActivity);
      res.json(updatedActivity);
    }
}

module.exports = ActivitiesController;