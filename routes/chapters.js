var express = require("express");
const { AdminPrivileges } = require("../middlewares/jwtServices");
const canActivate = require("../middlewares/canActivate");
const {
  createChapterController,
} = require("../controllers/chapters.controllers");

var router = express.Router();

router.post(
  "/",
  AdminPrivileges,
  canActivate("chapters", "create"),
  createChapterController
);

module.exports = router;
