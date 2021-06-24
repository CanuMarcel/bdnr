const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
    contactPoints: ['cassandra'],
    localDataCenter: 'datacenter1',
    keyspace: 'bdnr',
    credentials: {
        username: 'cassandra',
        password: 'cassandra',
    }
});


const mapper = new cassandra.mapping.Mapper(client, {
    models: { 'Activity': { tables: ['activities'] }}
});

module.exports = mapper;