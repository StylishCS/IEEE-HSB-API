const mongoose = require("mongoose");
const achievementsSchema = new mongoose.Schema({
  events: Number,
  members: Number,
  awards: Number,
});

const Achievement = mongoose.model("Achievement", achievementsSchema);
exports.Achievement = Achievement;
