const mongoose = require("mongoose");
const sloganSchema = new mongoose.Schema({
  text: String,
  season: String,
});

const Slogan = mongoose.model("Slogan", sloganSchema);
exports.Slogan = Slogan;
