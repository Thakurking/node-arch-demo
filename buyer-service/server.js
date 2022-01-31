const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan("combined"));
app.use(helmet());

const buyerRoute = require("./routes/buyer.routes");

app.use("/buyer", cors(), buyerRoute);

const PORT = 5001;

const server = app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});

process.on("unhandledRejection", (err, promis) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
