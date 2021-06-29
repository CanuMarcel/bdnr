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
    
    async findOne(user_id, activity_timeuuid) {
        try {
            const result = await this.activity.get({user_id, activity_timeuuid});
            return result;
        } catch(error) {
            console.error(error);
            return null;
        }
    }
    
    async create(activity) {
        activity.activity_timeuuid = TimeUuid.now();
        await this.activity.insert(activity);
    }

    async update(activity) {
        await this.activity.update(activity);
    }

}

module.exports = ActivitiesRepository;