const { Role } = require("../models/Role");
const { User } = require("../models/User");
const bcrypt = require("bcrypt");
async function seedWebMasterController(req, res) {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const user = await User.create(req.body);
    const role = await Role.find();
    user.roleId = role[0]._id;
    await user.save();
    return res.status(201).json(user);
  } catch (err) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function definePermissionsController(req, res) {
  try {
    const role = await Role.create(req.body);
    return res.status(201).json(role);
  } catch (err) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

module.exports = { seedWebMasterController, definePermissionsController };
