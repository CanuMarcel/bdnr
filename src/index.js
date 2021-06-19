const express = require('express');
const morgan = require('morgan')
const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
    contactPoints: ['cassandra'],
    localDataCenter: 'datacenter1',
});

const createKeyspace = `
    CREATE KEYSPACE IF NOT EXISTS bdnr 
    WITH REPLICATION = {
        'class': 'SimpleStrategy',
        'replication_factor' : 1
    }
`;
client.execute(createKeyspace).then(async () => {
    await client.execute('USE bdnr;');
    await client.execute(`
        CREATE TYPE IF NOT EXISTS user_comment (
            user_id timeuuid,
            text text
        );
    `);
    await client.execute(`
        CREATE TABLE IF NOT EXISTS activities (
            user_id timeuuid,
            timestamp timestamp,
            type text,
            title text,
            url text,
            comment text,
            text text,
            physical_activity_type text,
            duration duration,
            distance float,
            photo_url text,
            description text,
            perceived_effort smallint,
            latitude float,
            longitude float,
            average_speed float,
            cadence float,
            calories float,
            comments SET<FROZEN<user_comment>>,
            kudos SET<text>,
            PRIMARY KEY (user_id, timestamp)
        ) WITH CLUSTERING ORDER BY (timestamp DESC);
    `);
});


const app = express();

app.use(morgan('tiny'));


app.get('/', async (req, res) => {
    const query = 'SELECT name, email FROM users WHERE key = ?';
    const result = await client.execute(query, [ 'someone' ])
    res.json(result)
})

app.listen(3000, () => {
    console.log('Listening on port 3000');
});