const jwt = require("jsonwebtoken");
const User = require("../models/user");
// authMiddleware.js
exports.protect = (roles = []) => {
  return async (req, res, next) => {
    try {
      let token;
  //   Extract Token
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        token = req.headers.authorization.split(" ")[1];
      }
// Check if token exists
      if (!token) {
        return res.status(401).json({ message: "No token" });
      }
// Verify Token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id);
// Check if user exists and role is authorized
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).json({ message: "Not authorized" });
      }

      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  };
};
