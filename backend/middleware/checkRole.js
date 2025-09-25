import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user && user.role === "admin") return next();
  } catch (error) {
    return res.status(500).json({ message: "Server Error." });
  }

  return res.status(403).json({ message: "Access denied. Admins only." });
};

export const isUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user && user.role === "user") return next();
  } catch (error) {
    return res.status(500).json({ message: "Server Error." });
  }

  return res.status(403).json({ message: "Access denied. User only." });
};
