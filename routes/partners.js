var express = require("express");
const {
  getPartnersController,
  createPartnerController,
  deletePartnerController,
} = require("../controllers/partners.controllers");

const multer = require("multer");
const uploadToCloudinary = require("../middlewares/uploadToCloudinary");
const { AdminPrivileges } = require("../middlewares/jwtServices");
const upload = multer();

var router = express.Router();

router.get("/", getPartnersController);
router.post(
  "/",
  AdminPrivileges,
  upload.single("image"),
  uploadToCloudinary,
  createPartnerController
);
router.delete("/:id", deletePartnerController);

module.exports = router;
