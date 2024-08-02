var express = require("express");
const uploadToCloudinary = require("../middlewares/uploadToCloudinary");
const {
  getAchievementsController,
  addAchievementsController,
} = require("../controllers/achievements.controllers");
const { AdminPrivileges } = require("../middlewares/jwtServices");

var router = express.Router();

router.get("/", getAchievementsController);
router.post("/", AdminPrivileges, addAchievementsController);

module.exports = router;
