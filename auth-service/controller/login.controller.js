const JWT = require("jsonwebtoken");

exports.login = async (req, res) => {
  const secret = fs.readFileSync("/app/auth/certs/private.pem");
  //after checking all login credentials this action should be taken
  const token = JWT.sign({}, secret, {
    expiresIn: "1min",
    algorithm: "RS256",
  });
  return res.json({ token });
};
