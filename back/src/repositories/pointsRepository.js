const cassandraMapper = require('./cassandraMapper');

class PointsRepository {
    constructor() {
        this.point = cassandraMapper.forModel('Point');
    }
    async listForActivity(userId, activityUUID) {
        const result = await this.point.find({ user_id: userId, activity_timeuuid: activityUUID });
        return result.toArray();
    }
}

module.exports = PointsRepository;