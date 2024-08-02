var express = require("express");

var router = express.Router();

const multer = require("multer");
const uploadArrayToCloudinary = require("../middlewares/uploadArrayToCloudinary");
const {
  addImagesToGalleryController,
  getGalleryImagesController,
  deleteImageFromGalleryController,
} = require("../controllers/gallery.controllers");
const { AdminPrivileges } = require("../middlewares/jwtServices");
const upload = multer();

router.get("/", getGalleryImagesController);
router.post(
  "/",
  AdminPrivileges,
  upload.array("images"),
  uploadArrayToCloudinary,
  addImagesToGalleryController
);
router.delete("/:id", AdminPrivileges, deleteImageFromGalleryController);

module.exports = router;
