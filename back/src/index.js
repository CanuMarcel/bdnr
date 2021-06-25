const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./controllers/router');

const MongoRepository = require('./repositories/mongoRepository');

MongoRepository.initRepository();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use('/', router);


app.listen(8000, () => {
    console.log('Listening on port 8000');
});