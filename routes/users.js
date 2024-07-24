var express = require("express");
const {
  activateUserAccountController,
} = require("../controllers/authentication.controllers");
var router = express.Router();

router.post("/activate", activateUserAccountController);

module.exports = router;
