const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

async function UserPrivileges(req, res, next) {
  try {
    if (!req.header("Authorization")) {
      return res.status(401).json("FORBIDDEN");
    }
    const [key, token] = req.header("Authorization").split(" ");
    if (key !== process.env.JWT_KEYWORD_WARDENER) {
      return res.status(401).json("FORBIDDEN");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_WARDENER);
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json("FORBIDDEN");
    }
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json("Token expired");
    }
    return res.status(401).json("FORBIDDEN");
  }
}

async function AdminPrivileges(req, res, next) {
  try {
    if (!req.header("Authorization")) {
      return res.status(401).json("FORBIDDEN");
    }
    const [key, token] = req.header("Authorization").split(" ");
    if (key !== process.env.JWT_KEYWORD_ADMIN) {
      return res.status(401).json("FORBIDDEN");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_ADMIN);
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json("FORBIDDEN");
    }
    if (user.category === "PARTICIPANT") {
      return res.status(401).json("FORBIDDEN");
    }
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json("Token expired");
    }
    return res.status(401).json("FORBIDDEN");
  }
}

module.exports = { AdminPrivileges };

module.exports = { AdminPrivileges, UserPrivileges };
