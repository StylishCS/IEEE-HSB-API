var express = require("express");
const {
  createIeeeDayController,
  getIeeeDayController,
} = require("../controllers/ieeeDay.controllers");
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
  createIeeeDayController
);
router.get("/", getIeeeDayController);

module.exports = router;
