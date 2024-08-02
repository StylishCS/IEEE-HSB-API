var express = require("express");
const {
  createSloganController,
  getSloganController,
} = require("../controllers/slogan.controllers");
const { AdminPrivileges } = require("../middlewares/jwtServices");

var router = express.Router();

router.post("/", AdminPrivileges, createSloganController);
router.get("/", getSloganController);

module.exports = router;
