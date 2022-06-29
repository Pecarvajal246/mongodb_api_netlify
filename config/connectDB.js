const {
    MongoClient
} = require('mongodb');

require('dotenv').config();

let url = process.env.MONGO_URL;

async function connectDB() {
    const client = new MongoClient(url);
    await client.connect();
    return client;
}
module.exports = connectDB;
