var express = require("express");
const {
  seedWebMasterController,
  definePermissionsController,
} = require("../controllers/seed");
const {
  adminLoginController,
} = require("../controllers/authentication.controllers");
var router = express.Router();


router.post("/login", adminLoginController);
module.exports = router;
