const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const createError = require("http-errors");
const amqp = require("amqplib");
const expressJwt = require("express-jwt");
const jwksClient = require("jwks-rsa");

// var connection, channel;
async function amqpConnect() {
  try {
    console.log("==========buyer amqp connection==========");
    const connection = await amqp.connect(
      "amqp://admin:StrongPassword@13.232.71.179"
    );
    const channel = await connection.createChannel();
    console.log(channel)
    await channel.assertQueue("BUYER_QUEUE", { durable: true });
    // console.log(channel);
    app.set("channel", channel);
    module.exports.channel = channel;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
amqpConnect();
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

const buyerRoute = require("./routes/buyer.routes");
const { channel } = require("diagnostics_channel");

app.use("/buyer", cors(), buyerRoute);

const PORT = 5007;

console.log("hii from buyer server");

const server = app.listen(PORT, () => {
  console.log(`buyer server is running on ${PORT}`);
});

process.on("unhandledRejection", (err, promis) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
