const cassandraMapper = require('./cassandraMapper');

class ActivitiesRepository {
    constructor() {
        this.activity = cassandraMapper.forModel('Activity');
    }

    async listAll(user_id) {
        const result = await this.activity.find({ user_id });
        return result.toArray();
    }

    async create(activity) {
        const result = await this.activity.insert(activity);
        console.dir(result)
    }
}

module.exports = ActivitiesRepository;