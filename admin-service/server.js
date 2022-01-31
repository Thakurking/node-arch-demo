const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan("combined"));
app.use(helmet());

const adminRoute = require("./routes/admin.routes");

app.use("/admin", cors(), adminRoute);

const PORT = 5002;

const server = app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});

process.on("unhandledRejection", (err, promis) => {
  console.log(`Logger Error ${err}`);
  server.close(() => process.exit(1));
});
