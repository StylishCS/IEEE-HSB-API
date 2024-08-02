var express = require("express");
const uploadToCloudinary = require("../middlewares/uploadToCloudinary");
const {
  getFamilyMembersController,
  deleteFamilyMemberController,
  createFamilyMemberController,
} = require("../controllers/family.controllers");

const multer = require("multer");
const { AdminPrivileges } = require("../middlewares/jwtServices");
const upload = multer();

var router = express.Router();

router.get("/", getFamilyMembersController);
router.post(
  "/",
  AdminPrivileges,
  upload.single("image"),
  uploadToCloudinary,
  createFamilyMemberController
);
router.delete("/:id", AdminPrivileges, deleteFamilyMemberController);

module.exports = router;
