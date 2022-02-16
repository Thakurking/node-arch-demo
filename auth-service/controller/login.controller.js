const JWT = require("jsonwebtoken");
const fs = require("fs");
const os = require("os");
const path = require("path");

var filename = "private.pem";
let filepath = path.join(__dirname, "/certs/", filename);

exports.login = async (req, res) => {
//   console.log(os.homedir());
//   console.log(filepath)
  const secret = fs.readFileSync("/app/auth/certs/private.pem");
  //after checking all login credentials this action should be taken
  const token = JWT.sign({}, secret, {
    expiresIn: "1min",
    algorithm: "RS256",
  });
  return res.json({ token });
};
