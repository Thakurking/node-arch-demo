const express = require("express");
const cors = require("cors");
const expressJwt = require("express-jwt");
const jwksClient = require("jwks-rsa");
const https = require("https")
const fs = require("fs")

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

app.use(expressJwt({
  secret: jwksClient.expressJwtSecret({
    jwksUri: "http://localhost:5003/.well-known/jwks.json",
    cache: true,
    rateLimit: true,
    handleSigningKeyError: (err, cb) => {
      if (err instanceof jwksClient.SigningKeyNotFoundError) {
        return cb(new Error("this is bad"))
      }
      return cb(err);
    },
  }),
  algorithms: ["RS256"],
}).unless({ path: ['/auth/login'] }))

const authroute = require("./routes/auth.routes");

app.use("/auth", cors(), authroute);

app.get("/auth/verify-token", async (req, res) => {
  console.log("got security")
  return res.json({ status: true })
})

var request = require("request")

var options = {
  method: 'GET',
  url: 'http://localhost:5003/auth/verify-token',
  headers: { authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTM2MzI5NjcsImV4cCI6MTY1MzYzMzAyN30.vpB-lvFymjwiGMWIUaITjVh5r_MsZ0RcLq3VhPCH6mmkv8HQmmyhdQIYYVYgkNElsfno1JdI9ydVazFqIeIqiXFSC27zW7yeKH6be1GpH-7HRDhOPEszcNjalZ0ZAfgNrHlgqtTZCEoSsQOgWeVz8YwO3mom3gxeTVFP7oAOH0TMqJdbsqShwo4SqfMdsPnFdk5Mb5UmOPmfAPGbeDI0mNRu8O2WRNe1Qh9nVtljQxwM9i91AC4Y_oqAQQVzobyoruBRVwGGEPFxty127ab1kq3IvzQOYphPTA4ApSP5ZMSMHpduPeVNoQtD6exH5gjooYtp7XHmdjz3AIErzzgpySowgNO62Sxooa2aZlEFc6ANPt6ctcOZ-bRaRCBXExINwICI0kCzHOP_Os4DDAANecjzdS3iyno82W3OYPrU8H6ff7U9M0vIozoQInYW54PTg4VI_nHBMsASNfbdQjhsYCtJCpF8rRkdhXl6FyFy72I9LCy-eU8valYuPD3nK4r9' }
};

request(options, function (error, response, body) {
  console.log(body)
  if (body.includes("status")) {
    console.log("got status")
    const status = JSON.parse(body)
    if (status.status) {
      console.log("auth success")
    }
  } else {
    console.log("no auth")
  }
})

const PORT = 5003;

const server = app.listen(PORT, () => {
  console.log(`auth server running on port: ${PORT}`);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logges Error: ${err}`);
  server.close(() => process.exit(1));
});
