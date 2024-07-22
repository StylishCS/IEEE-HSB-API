var express = require("express");
const { AdminPrivileges } = require("../middlewares/jwtServices");
const canActivate = require("../middlewares/canActivate");
const {
  seedWebMasterController,
  definePermissionsController,
} = require("../controllers/seed");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* Seeds */
router.post("/seed", seedWebMasterController);
router.post("/permissions", definePermissionsController);
router.get(
  "/test",
  AdminPrivileges,
  canActivate("applications", "create"),
  (req, res) => {
    res.send("ok");
  }
);

module.exports = router;
