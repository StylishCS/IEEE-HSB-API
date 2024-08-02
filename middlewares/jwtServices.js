const jwt = require("jsonwebtoken");
const { User } = require("../models/User");
const { decryptPayload } = require("../utils/cryptoService");

async function AdminPrivileges(req, res, next) {
  try {
    if (!req.cookies.accessToken) {
      return res.status(401).json("FORBIDDEN");
    }
    const decoded = jwt.verify(
      req.cookies.accessToken,
      process.env.JWT_SECRET_ADMIN
    );
    const decryptedData = decryptPayload(decoded.encryptedAccessTokenPayload);
    const user = await User.findById(decryptedData._id);
    if (!user) {
      return res.status(401).json("FORBIDDEN");
    }
    req.user = decryptedData;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json("Token expired");
    }
    return res.status(401).json("FORBIDDEN");
  }
}

module.exports = { AdminPrivileges };
