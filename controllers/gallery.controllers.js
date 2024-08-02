const { Gallery } = require("../models/Gallery");
const cloudinary = require("../utils/cloudinary");
async function addImagesToGalleryController(req, res) {
  try {
    console.log(req.cloudinaryResults);
    for (var image of req.cloudinaryResults) {
      req.body.image = image.secure_url;
      await Gallery.create(req.body);
    }
    res.status(201).json("Created");
  } catch (err) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function getGalleryImagesController(req, res) {
  try {
    const gallery = await Gallery.find();
    return res.status(200).json(gallery);
  } catch (err) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function deleteImageFromGalleryController(req, res) {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) {
      return res.status(404).json("Image not found");
    }
    const publicId = image.image.split("/").pop().split(".")[0];
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });
    if (result.result !== "ok") {
      throw Error();
    }
    await Gallery.findByIdAndDelete(req.params.id);
    return res.status(200).json("deleted");
  } catch (err) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}
module.exports = {
  addImagesToGalleryController,
  getGalleryImagesController,
  deleteImageFromGalleryController,
};
