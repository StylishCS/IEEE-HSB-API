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

router.get("/set-cookie", (req, res) => {
  res.cookie("myCookie", "cookie123", {
    httpOnly: true,
    path: "/",
    secure: true,
  });
  res.end();
});

router.get("/cookie", (req, res) => {
  res.cookie("token", "testToken123", {
    // can only be accessed by server requests
    httpOnly: true,
    // path = where the cookie is valid
    path: "/",
    // domain = what domain the cookie is valid on
    domain: "localhost",
    // secure = only send cookie over https
    secure: false,
    // sameSite = only send cookie if the request is coming from the same origin
    sameSite: "lax", // "strict" | "lax" | "none" (secure must be true)
    // maxAge = how long the cookie is valid for in milliseconds
    maxAge: 30 * 24 * 60 * 60 * 1000, // 1 hour
  });
  //res.setHeader("Set-Cookie", "myCookie=exampleValue; HttpOnly");
  res.json("ok");
});

router.get("/check-cookie", (req, res) => {
  // Read the cookies from the request
  const cookies = req.cookies;
  res.json(cookies);
});

module.exports = router;
