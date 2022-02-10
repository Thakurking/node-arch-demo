const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const amqp = require("amqplib");

var connection, channel;
const amqpConnect = async () => {
  try {
    console.log("==========seller amqp connection==========");
    connection = await amqp.connect(
      "amqp://admin:StrongPassword@13.232.71.179"
    );
    channel = await connection.createChannel();
    await channel.assertQueue("SELLER_QUEUE", { durable: true });
    console.log(channel);
    module.exports.channel = channel
    // app.set("channel", channel);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports.amqpConnect = amqpConnect
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan("combined"));
app.use(helmet());
const sellerRoute = require("./routes/seller.routes");

app.use("/seller", cors(), sellerRoute);

const consumer = require("./consumer")

const PORT = 5000;

console.log("hii from seller service");

const server = app.listen(PORT, async () => {
  console.log(`seller server is running on ${PORT}`);
});

process.on("unhandledRejection", (err, promis) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
