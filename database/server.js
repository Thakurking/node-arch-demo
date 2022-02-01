const express = require("express");
const app = express();

const PORT = 5003;

const server = app.listen(PORT, () => {
  console.log(`db server is running on ${PORT}`);
});

process.on('unhandledRejection', (err, promis) => {
  console.log(`Logged Error: ${err}`)
  server.close(() => process.exit(1))
})
