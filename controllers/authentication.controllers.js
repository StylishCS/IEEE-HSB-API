const { User } = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
async function adminLoginController(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json("Wrong Email or Password");
    }
    const valid = bcrypt.compareSync(req.body.password, user.password);
    if (!valid) {
      return res.status(401).json("Wrong Email or Password");
    }
    if (user.category == "participant") {
      return res.status(401).json("Wrong Email or Password");
    }
    let userWithoutPassword = { ...user };
    delete userWithoutPassword._doc.password;
    const token = jwt.sign(
      userWithoutPassword._doc,
      process.env.JWT_SECRET_ADMIN,
      { expiresIn: "18h" }
    );
    userWithoutPassword = userWithoutPassword._doc;
    return res.status(200).json({ ...userWithoutPassword, token });
  } catch (err) {
    console.log(err);
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

module.exports = { adminLoginController };
