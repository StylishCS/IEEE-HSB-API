const mongoose = require("mongoose");
const partnerSchema = new mongoose.Schema({
  name: String,
  image: String,
  url: String,
});

const Partner = mongoose.model("Partner", partnerSchema);
exports.Partner = Partner;
