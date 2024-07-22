const { Role } = require("../models/Role");

module.exports = (permissionCategory, action) => {
  return async (req, res, next) => {
    try {
      const role = await Role.findById(req.user.roleId);
      if (!role) {
        return res.status(401).json("FORBIDDEN");
      }
      if (!role.permissions[permissionCategory][action]) {
        return res.status(401).json("FORBIDDEN");
      }
      next();
    } catch (err) {
      return res.status(401).json("FORBIDDEN");
    }
  };
};
