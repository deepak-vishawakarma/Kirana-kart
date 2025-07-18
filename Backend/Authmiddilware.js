// Middleware/AuthMiddleware.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function verifyAdminToken(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>

    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // You can access req.user.id in next functions
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}
