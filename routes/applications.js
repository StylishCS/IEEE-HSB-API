var express = require("express");
const {
  createApplicationController,
  getApplicationsController,
  getApplicationByIdController,
  submitAnswerApplicationController,
  getApplicationWithAnswersController,
  getApplicationByIdWithAnswersController,
} = require("../controllers/applications.controllers");
const upload = require("../uploads/uploadImage");
const { AdminPrivileges } = require("../middlewares/jwtServices");
const canActivate = require("../middlewares/canActivate");
var router = express.Router();

router.post(
  "/",
  AdminPrivileges,
  canActivate("applications", "create"),
  upload.single("image"),
  createApplicationController
);

router.get("/", getApplicationsController);
router.get("/:id", getApplicationByIdController);
router.post("/submit/:id", submitAnswerApplicationController);

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

module.exports = router;
