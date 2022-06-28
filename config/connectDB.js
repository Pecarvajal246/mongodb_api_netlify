const {
    MongoClient
} = require('mongodb');

require('dotenv').config();

let url = `mongodb+srv://${process.env.MONGO_ID}:${process.env.MONGO_PASS}@dbstore.rdowu.mongodb.net/?retryWrites=true&w=majority`;

async function connectDB() {
    const client = new MongoClient(url);
    await client.connect();
    return client;
}
module.exports = connectDB;
