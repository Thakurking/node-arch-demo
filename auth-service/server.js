const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// app.post("/auth/login", async (req, res) => {
//   const secret = fs.readFileSync("./certs/private.pem");
//   //after checking all login credentials this action should be taken
//   const token = JWT.sign({}, secret, {
//     expiresIn: "1min",
//     algorithm: "RS256",
//   });
//   return res.json({ token });
// });

const authroute = require("./routes/auth.routes");

app.use("/auth", cors(), authroute);

const PORT = 5003;

const server = app.listen(PORT, () => {
  console.log(`auth server running on port: ${PORT}`);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logges Error: ${err}`);
  server.close(() => process.exit(1));
});
