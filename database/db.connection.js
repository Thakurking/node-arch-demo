const { MongoClient } = require("mongodb");
require('dotenv').config()
const URI = `demouri`;
const client = new MongoClient(URI);
module.exports = client;
