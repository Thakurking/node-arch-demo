const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan("combined"));
app.use(helmet());

const sellerRoute = require("./routes/seller.routes");

app.use("/seller", cors(), sellerRoute);

const PORT = 5000;

const server = app.listen(PORT, () => {
  console.log(`seller server is running on ${PORT}`);
});

process.on('unhandledRejection', (err, promis) => {
  console.log(`Logged Error: ${err}`)
  server.close(() => process.exit(1))
})
