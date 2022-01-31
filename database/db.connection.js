const { MongoClient } = require("mongodb");
require('dotenv').config()
const URI = `mongodb+srv://Blkhrt:Blkhrt@cluster0.czghw.mongodb.net/creditengine?retryWrites=true&w=majority`;
const client = new MongoClient(URI);
module.exports = client;
