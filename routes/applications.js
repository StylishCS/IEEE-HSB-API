var express = require("express");
const {
  createApplicationController,
  getApplicationsController,
  getApplicationByIdController,
  submitAnswerApplicationController,
  getApplicationWithAnswersController,
  getApplicationByIdWithAnswersController,
  approveApplicationSubmitController,
} = require("../controllers/applications.controllers");
const multer = require("multer");
const upload = multer();
const { AdminPrivileges } = require("../middlewares/jwtServices");
const canActivate = require("../middlewares/canActivate");
const uploadToCloudinary = require("../middlewares/uploadToCloudinary");
var router = express.Router();

/* Admin Actions */
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
router.patch(
  "/admin/approve/:id",
  AdminPrivileges,
  canActivate("applications", "edit"),
  approveApplicationSubmitController
);

/* User Actions */
router.post("/submit/:id", submitAnswerApplicationController);
router.get("/", getApplicationsController);
router.get("/:id", getApplicationByIdController);

module.exports = router;
