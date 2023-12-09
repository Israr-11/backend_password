const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const bearerToken = (req, res, next) => {
  //When accessing the welcome route, include "Bearer" before the token in the Authorization header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    res.status(400).send("Authorization failed! No Token found");
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.secretKey);
    req.user = decoded;
  } catch (error) {
    return res.status(401).send("Invalid Token");
  }

  return next();
};

module.exports = bearerToken;
