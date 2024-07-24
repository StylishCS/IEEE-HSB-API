var express = require("express");
const {
  adminLoginController,
  verifyAdminLoginController,
  adminRefreshTokenController,
} = require("../controllers/authentication.controllers");
var router = express.Router();

router.post("/login", adminLoginController);
router.post("/verify", verifyAdminLoginController);
router.get("/refreshToken", adminRefreshTokenController);
module.exports = router;
