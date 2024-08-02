var express = require("express");
const {
  getContactFormsController,
  submitContactFormController,
} = require("../controllers/contact.controllers");
const { AdminPrivileges } = require("../middlewares/jwtServices");

var router = express.Router();

router.get("/", AdminPrivileges, getContactFormsController);
router.post("/", submitContactFormController);

module.exports = router;
