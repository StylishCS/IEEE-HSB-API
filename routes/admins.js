var express = require("express");
const {
  adminLoginController,
  verifyAdminLoginController,
  adminRefreshTokenController,
} = require("../controllers/authentication.controllers");
const { AdminPrivileges } = require("../middlewares/jwtServices");
var router = express.Router();

router.post("/login", adminLoginController);
router.post("/verify", verifyAdminLoginController);
router.get("/refreshToken", AdminPrivileges, adminRefreshTokenController);
module.exports = router;
