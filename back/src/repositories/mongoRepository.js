const mongoose = require('mongoose');

module.exports = class MongoRepository {
    constructor() {
        this.connection = null;
    }

    static async connect() {
        this.connection = await mongoose.connect(this.getUrl(), { useNewUrlParser: true, useUnifiedTopology: true });
        mongoose.set('debug', false);
    }

    static getUrl() {
        let connectionUrl = `mongodb://mongo:27017/db`;
        return connectionUrl;
    }

    static async initRepository() {
        try {
            await this.connect();
        } catch (err) {
            console.log(`Error trying to connect to database: ${err}`);
        }
    }
};