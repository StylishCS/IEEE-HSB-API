var express = require("express");
const uploadToCloudinary = require("../middlewares/uploadToCloudinary");

const multer = require("multer");
const {
  createEventController,
  getEventsController,
} = require("../controllers/events.controllers");
const { AdminPrivileges } = require("../middlewares/jwtServices");
const upload = multer();

var router = express.Router();

router.get("/", getEventsController);
router.post(
  "/",
  AdminPrivileges,
  upload.single("image"),
  uploadToCloudinary,
  createEventController
);

module.exports = router;
