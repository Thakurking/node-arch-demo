const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const amqp = require("amqplib");

var connection, channel;
async function amqpConnect() {
  connection = await amqp.connect("amqp://rabbitmq:5672");
  channel = await connection.createChannel();
  await channel.assertQueue("SELLER_QUEUE", { durable: true });
  console.log(channel)
}
amqpConnect();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan("combined"));
app.use(helmet());
app.set("channel", channel);
const sellerRoute = require("./routes/seller.routes");

app.use("/seller", cors(), sellerRoute);

const PORT = 5000;

const consumer = require("./consumer");

const server = app.listen(PORT, async () => {
  console.log(`seller server is running on ${PORT}`);
});

process.on("unhandledRejection", (err, promis) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});