const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if(!authHeader) {
    return res.status(401).json({ status: "You are not authenticated!" })
  } else {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, secret, (err, payload) => {
      if(err) {
        return res.status(403).json({ message: "Token is not valid!" })
      }
      // req.user = payload;
      next();
    })
  }
}