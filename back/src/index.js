const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./controllers/router');
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


const MongoRepository = require('./repositories/mongoRepository');

MongoRepository.initRepository();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use('/', router);


app.listen(3000, () => {
    console.log('Listening on port 3000');
});