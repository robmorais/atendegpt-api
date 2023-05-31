const { v4: uuidv4 } = require('uuid');
const { getDb } = require('../db/mongo');

class SiteBot {
    constructor(name, baseUrl) {
        this.name = name;
        this.baseUrl = baseUrl;
        this.token = uuidv4(); // Generate unique token
    }

    async save() {
        const db = getDb();
        await db.collection('sitebots').insertOne(this);
    }

    static async findByToken(token) {
        const db = getDb();
        return await db.collection('sitebots').findOne({ token: token });
    }
}

module.exports = SiteBot;