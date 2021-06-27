const cassandraMapper = require('./cassandraMapper');

class PointsRepository {
    constructor() {
        this.point = cassandraMapper.forModel('Point');
    }
    async listForActivity(user_id, activity_timeuuid) {
        const result = await this.point.find({ user_id, activity_timeuuid });
        return result.toArray();
    }
}

module.exports = PointsRepository;