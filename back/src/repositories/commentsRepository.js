const cassandraMapper = require('./cassandraMapper');
const TimeUuid = require('cassandra-driver').types.TimeUuid;

class CommentsRepository {
    constructor() {
        this.comment = cassandraMapper.forModel('Comment');
    }
    async listForActivity(activity_user_id, activity_timeuuid) {
        try {
            const result = await this.comment.find({ activity_user_id, activity_timeuuid });
            return result.toArray();
        } catch(error) {
            console.error(error);
            return [];
        }
    }
    
    async create(comment) {
        comment.comment_timeuuid = TimeUuid.now();
        await this.comment.insert(comment);
    }
}

module.exports = CommentsRepository;