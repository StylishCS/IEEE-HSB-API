const mongoose = require("mongoose");

const permissionsSchema = new mongoose.Schema({
  _id: false,
  create: { type: Boolean, default: false },
  delete: { type: Boolean, default: false },
  edit: { type: Boolean, default: false },
  view: { type: Boolean, default: false },
});
const roleSchema = new mongoose.Schema({
  role: String,
  permissions: {
    applications: permissionsSchema,
    committees: permissionsSchema,
    chapters: permissionsSchema,
  },
});

const Role = mongoose.model("Role", roleSchema);
exports.Role = Role;
