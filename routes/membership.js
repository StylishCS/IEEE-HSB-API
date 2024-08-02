var express = require("express");
const {
  getMembershipFormsController,
  submitMembershipFormController,
  approveFormController,
} = require("../controllers/membershipForms.controllers");
const { AdminPrivileges } = require("../middlewares/jwtServices");

var router = express.Router();

router.get("/", AdminPrivileges, getMembershipFormsController);
router.post("/", submitMembershipFormController);
router.patch("/:id", AdminPrivileges, approveFormController);

module.exports = router;
