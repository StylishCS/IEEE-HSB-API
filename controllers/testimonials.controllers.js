const { Testimonial } = require("../models/Testimonial");
const cloudinary = require("../utils/cloudinary");
async function createTestimonialController(req, res) {
  try {
    req.body.image = req.cloudinaryResult.secure_url;
    await Testimonial.create(req.body);
    return res.status(201).json("Created");
  } catch (err) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function getTestimonialsController(req, res) {
  try {
    const testimonials = await Testimonial.find();
    return res.status(200).json(testimonials);
  } catch (err) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function deleteTestimonialController(req, res) {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json("Testimonial not found");
    }
    const publicId = testimonial.image.split("/").pop().split(".")[0];
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });
    if (result.result !== "ok") {
      throw Error();
    }
    await Testimonial.findByIdAndDelete(req.params.id);
    return res.status(200).json("Deleted");
  } catch (err) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

module.exports = {
  deleteTestimonialController,
  getTestimonialsController,
  createTestimonialController,
};
