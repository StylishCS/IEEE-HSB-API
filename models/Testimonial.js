const mongoose = require("mongoose");
const testimonialSchema = new mongoose.Schema({
  image: String,
  name: String,
  position: String,
  quote: String,
});

const Testimonial = mongoose.model("Testimonial", testimonialSchema);
exports.Testimonial = Testimonial;
