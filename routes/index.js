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
/* End OF Seeds */

/* Cookies */
router.get("/cookie", (req, res) => {
  res.setHeader("Set-Cookie", [
    `cookieOne=${"test123"}; HttpOnly; SameSite=None; Path=/; Max-Age=${
      60 * 60
    }; Secure=True;`,
    `cookieTwo=${"test456"}; HttpOnly; SameSite=None; Path=/; Max-Age=${
      60 * 60 * 24 * 7 * 2
    }; Secure=True;`,
  ]);
  res.json("ok");
});

router.get("/check-cookie", (req, res) => {
  // Read the cookies from the request
  const cookies = req.cookies;
  res.json(cookies);
});
/* End Of Cookies */

module.exports = router;
