// const client = require("../../database/db.connection");

exports.getAdmin = async (req, res) => {
  // return res.json({ data: { name: "cat admin" }, status: true });
  await client.connect();
  const db = client.db("creditengine");
  const result = await db.collection("credit_data").find({}).toArray();
  return res.json({ result });
};
