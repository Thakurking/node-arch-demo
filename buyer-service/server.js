const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const amqp = require("amqplib");

var connection, channel;
async function amqpConnect() {
  try {
    console.log('==========inside buyer amqp connection==========')
    connection = await amqp.connect("amqp://rabbitmq:5673");
    channel = await connection.createChannel();
    await channel.assertQueue("BUYER_QUEUE", { durable: true });
    console.log(channel);
  } catch (error) {
    console.log(error)
    throw error;
  }
}
amqpConnect();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan("combined"));
app.use(helmet());

app.set("channel", channel);

const buyerRoute = require("./routes/buyer.routes");

app.use("/buyer", cors(), buyerRoute);

const PORT = 5001;

console.log("hii from buyer server");

const server = app.listen(PORT, () => {
  console.log(`buyer server is running on ${PORT}`);
});

process.on("unhandledRejection", (err, promis) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
