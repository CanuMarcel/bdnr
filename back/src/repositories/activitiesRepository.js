const cassandraMapper = require('./cassandraMapper');

class ActivitiesRepository {
    constructor() {
        this.activity = cassandraMapper.forModel('Activity');
    }
    async listAll(userId) {
        const result = await this.activity.find({ user_id: userId });
        return result.toArray();
    }   
}

module.exports = ActivitiesRepository;