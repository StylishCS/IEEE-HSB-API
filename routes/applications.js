var express = require("express");
const {
  createApplicationController,
  getApplicationsController,
  getApplicationByIdController,
  submitAnswerApplicationController,
  getApplicationWithAnswersController,
  getApplicationByIdWithAnswersController,
} = require("../controllers/applications.controllers");
const multer = require("multer");
const upload = multer();
const { AdminPrivileges } = require("../middlewares/jwtServices");
const canActivate = require("../middlewares/canActivate");
const uploadToCloudinary = require("../middlewares/uploadToCloudinary");
var router = express.Router();

router.post(
  "/",
  AdminPrivileges,
  canActivate("applications", "create"),
  upload.single("image"),
  uploadToCloudinary,
  createApplicationController
);
router.get(
  "/admin",
  AdminPrivileges,
  canActivate("applications", "view"),
  getApplicationWithAnswersController
);
router.get(
  "/admin/:id",
  AdminPrivileges,
  canActivate("applications", "view"),
  getApplicationByIdWithAnswersController
);

router.post("/submit/:id", submitAnswerApplicationController);
router.get("/", getApplicationsController);
router.get("/:id", getApplicationByIdController);

module.exports = router;
