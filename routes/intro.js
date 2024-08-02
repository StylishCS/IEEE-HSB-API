var express = require("express");
const {
  createIntroController,
  getIntroController,
} = require("../controllers/intro.controller");
const uploadToCloudinary = require("../middlewares/uploadToCloudinary");

const multer = require("multer");
const { AdminPrivileges } = require("../middlewares/jwtServices");
const upload = multer();

var router = express.Router();

router.post(
  "/",
  AdminPrivileges,
  upload.single("url"),
  uploadToCloudinary,
  createIntroController
);
router.get("/", getIntroController);

module.exports = router;
