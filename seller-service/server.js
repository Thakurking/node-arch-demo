const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const createError = require("http-errors");
const amqp = require("amqplib");
const expressJwt = require("express-jwt");
const jwksClient = require("jwks-rsa");

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
// app.use((req, res, next) => {
//   next(createError.NotFound());
// });
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

app.use(morgan("combined"));
app.use(helmet());

app.use(
  expressJwt({
    secret: jwksClient.expressJwtSecret({
      jwksUri: "http://192.168.1.16:5003/.well-known/jwks.json",
      cache: true,
      rateLimit: true,
    }),
    algorithms: ["RS256"],
  })
);

const sellerRoute = require("./routes/seller.routes");

app.use("/seller", cors(), sellerRoute);

const consumer = require("./consumer");

const PORT = 5000;

console.log("hii from seller service");

const server = app.listen(PORT, async () => {
  console.log(`seller server is running on ${PORT}`);
});

process.on("unhandledRejection", (err, promis) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
