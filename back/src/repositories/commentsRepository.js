const cassandraMapper = require('./cassandraMapper');

class CommentsRepository {
    constructor() {
        this.comment = cassandraMapper.forModel('Comment');
    }
    async listForActivity(activityUserId, activityUUID) {
        const result = await this.comment.find({ activity_user_id: activityUserId, activity_timeuuid: activityUUID });
        return result.toArray();
    }
}

module.exports = CommentsRepository;