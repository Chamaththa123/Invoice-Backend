const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(403).json({ Error: "No token provided" });
  }

  jwt.verify(token, "HTGWEWDWFSDCFSCW", (err, decoded) => {
    if (err) {
      return res.status(401).json({ Error: "Failed to authenticate token" });
    }
    req.userId = decoded.userId;
    next();
  });
};

module.exports = { verifyToken };
