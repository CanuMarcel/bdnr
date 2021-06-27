const cassandraMapper = require('./cassandraMapper');

class CommentsRepository {
    constructor() {
        this.comment = cassandraMapper.forModel('Comment');
    }
    async listForActivity(activity_user_id, activity_timeuuid) {
        const result = await this.comment.find({ activity_user_id, activity_timeuuid });
        return result.toArray();
    }
}

module.exports = CommentsRepository;