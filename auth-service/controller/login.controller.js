const JWT = require("jsonwebtoken");
const fs = require("fs")
const os = require("os").homedir()

exports.login = async (req, res) => {
  // const secret = fs.readFileSync("/app/auth/certs/private.pem");
  const secret = fs.readFileSync("/home/ritesh/demo-node-arch/auth-service/certs/private.pem")
  //after checking all login credentials this action should be taken
  const token = JWT.sign({}, secret, {
    expiresIn: "1min",
    algorithm: "RS256",
  });
  return res.json({ token });
};
