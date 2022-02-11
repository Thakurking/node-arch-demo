const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const amqp = require("amqplib");

// var connection, channel;
const amqpConnect = async () => {
  try {
    console.log("==========data process amqp connection==========");
    const connection = await amqp.connect(
      "amqp://admin:StrongPassword@13.232.71.179"
    );
    const channel = await connection.createChannel();
    await channel.assertQueue("CONSUME_GST_DATA", { durable: true });
    await channel.assertQueue("PROCESS_GST_DATA", { durable: true });
    // console.log(channel);
    module.exports.channel = channel;
    app.set("channel", channel);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
module.exports.amqpConnect = amqpConnect;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("combined"));
app.use(helmet());

const consumeGST = require("./consume-gst-data");
const processGST = require("./process-gst-data").processGST
const finishGST = require("./finish-gst-data");

const PORT = 5003;
const server = app.listen(PORT, () => {
  console.log(`data process server running on ${PORT}`);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
