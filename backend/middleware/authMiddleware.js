const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const bearer = req.headers.authorization || "";
  const tokenFromHeader = bearer.startsWith("Bearer ") ? bearer.slice(7) : null;
  const token = req.cookies?.token || tokenFromHeader;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = authenticate;
