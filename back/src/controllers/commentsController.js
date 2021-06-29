const ActivitiesRepository = require('../repositories/activitiesRepository');
const CommentsRepository = require('../repositories/commentsRepository');

class CommentsController {
    constructor() {
      this.repository = new CommentsRepository();
      this.activities = new ActivitiesRepository();
    }

    async list(req, res, next) {
      const result = await this.repository.listForActivity(req.params.activity_user_id, req.params.activity_timeuuid)
      res.json(result)
    }

    async create(req, res, next) {
      const comment = req.body;
      comment.activity_user_id = req.params.activity_user_id;
      comment.activity_timeuuid = req.params.activity_timeuuid;
      const activity = await this.activities.findOne(req.params.activity_user_id, req.params.activity_timeuuid);
      if(!activity) {
        return res.status(404).json({errors: [{param: 'activity_timeuuid', msg: 'Not found'}]})
      }
      const result = await this.repository.create(comment)
      res.json(result)
    }
}

module.exports = CommentsController;