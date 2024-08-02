const mongoose = require("mongoose");
const membershipFormSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    faculty: String,
    department: String,
  },
  { timestamps: true }
);

const MembershipForm = mongoose.model("MembershipForm", membershipFormSchema);
exports.MembershipForm = MembershipForm;
