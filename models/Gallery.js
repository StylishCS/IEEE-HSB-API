const mongoose = require("mongoose");
const gallerySchema = new mongoose.Schema({
  tag: String,
  image: String,
});

const Gallery = mongoose.model("Gallery", gallerySchema);
exports.Gallery = Gallery;
