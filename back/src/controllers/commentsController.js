const CommentsRepository = require('../repositories/commentsRepository');

class CommentsController {
    constructor() {
      this.repository = new CommentsRepository();
    }

    async list(req, res, next) {
      const result = await this.repository.listForActivity(req.params.user_id, req.params.activity_timeuuid)
      res.json(result)
    }

    async create(req, res, next) {
      const comment = req.body;
      comment.activity_user_id = req.params.user_id;
      comment.activity_timeuuid = req.params.activity_timeuuid
      const result = await this.repository.create(comment)
      res.json(result)
    }
}

module.exports = CommentsController;