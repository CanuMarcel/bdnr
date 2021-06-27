const cassandraMapper = require('./cassandraMapper');
const TimeUuid = require('cassandra-driver').types.TimeUuid;

class PointsRepository {
    constructor() {
        this.point = cassandraMapper.forModel('Point');
    }
    async listForActivity(user_id, activity_timeuuid) {
        const result = await this.point.find({ user_id, activity_timeuuid });
        return result.toArray();
    }

    async create(point) {
        point.point_timeuuid = TimeUuid.now();
        await this.point.insert(point);
    }
}

module.exports = PointsRepository;