const mongoose = require("mongoose");
const introSchema = new mongoose.Schema({
  url: String,
});

const Intro = mongoose.model("Intro", introSchema);
exports.Intro = Intro;
