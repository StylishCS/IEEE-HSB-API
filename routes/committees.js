var express = require("express");
const { AdminPrivileges } = require("../middlewares/jwtServices");
const canActivate = require("../middlewares/canActivate");
const {
  createCommitteeController,
} = require("../controllers/committees.controllers");

var router = express.Router();

router.post(
  "/",
  AdminPrivileges,
  canActivate("committees", "create"),
  createCommitteeController
);

module.exports = router;
