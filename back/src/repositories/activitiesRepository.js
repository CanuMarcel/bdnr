const cassandraMapper = require('./cassandraMapper');
const TimeUuid = require('cassandra-driver').types.TimeUuid;

class ActivitiesRepository {
    constructor() {
        this.activity = cassandraMapper.forModel('Activity');
    }

    async listForUser(user_id) {
        const result = await this.activity.find({ user_id });
        return result.toArray();
    }

    async create(activity) {
        activity.activity_timeuuid = TimeUuid.now();
        await this.activity.insert(activity);
    }
}

module.exports = ActivitiesRepository;