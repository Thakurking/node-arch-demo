const express = require("express");
const app = express();

const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb://13.235.81.47:27017";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ping: 1})
    console.log("database Connected")
    const db = await client.db("mydb").collection("user").find().toArray()
    console.log(db)
    // const insertUser = await client.db("mydb").collection("user").insertOne({name: "big black cat", age: 24})
    // console.log(insertUser)
    // const db = client.db("mydb")
    // const collection = db.collection("user")
    // const id = "6215fc7131802fca6dc7fab1"
    // const user = await collection.findOne({_id: ObjectId(`${id}`)})
    // console.log(user)
  } catch (error) {
      console.log(error)
  }
}

run()

const PORT = 5003;

const server = app.listen(PORT, () => {
  console.log(`db server is running on ${PORT}`);
});

process.on('unhandledRejection', (err, promis) => {
  console.log(`Logged Error: ${err}`)
  server.close(() => process.exit(1))
})
