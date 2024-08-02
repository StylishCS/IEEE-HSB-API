var express = require("express");
const {
  getTestimonialsController,
  createTestimonialController,
  deleteTestimonialController,
} = require("../controllers/testimonials.controllers");

const multer = require("multer");
const uploadToCloudinary = require("../middlewares/uploadToCloudinary");
const { AdminPrivileges } = require("../middlewares/jwtServices");
const upload = multer();

var router = express.Router();

router.get("/", getTestimonialsController);
router.post(
  "/",
  AdminPrivileges,
  upload.single("image"),
  uploadToCloudinary,
  createTestimonialController
);
router.delete("/:id", AdminPrivileges, deleteTestimonialController);

module.exports = router;
