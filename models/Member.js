const mongoose = require("mongoose");
const memberSchema = new mongoose.Schema({
  name: String,
  image: String,
  faculty: String,
  github: String,
  linkedin: String,
  isTech: Boolean,
  role: String,
});

const Member = mongoose.model("Member", memberSchema);
exports.Member = Member;
