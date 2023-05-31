const { MongoClient } = require('mongodb');

let db;

//Xova3W1Zra4VGf6v

async function connect(url, dbName) {
    const client = new MongoClient(url, { useUnifiedTopology: true });
    await client.connect();
    console.log('Connected to MongoDB');

    db = client.db(dbName);
}

function getDb() {
    return db;
}

module.exports = { connect, getDb };