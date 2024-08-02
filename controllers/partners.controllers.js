const { Partner } = require("../models/Partner");
const cloudinary = require("../utils/cloudinary");
async function createPartnerController(req, res) {
  try {
    req.body.image = req.cloudinaryResult.secure_url;
    await Partner.create(req.body);
    return res.status(201).json("Created");
  } catch (err) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function getPartnersController(req, res) {
  try {
    const partners = await Partner.find();
    return res.status(200).json(partners);
  } catch (err) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function deletePartnerController(req, res) {
  try {
    const partner = await Partner.findById(req.params.id);
    if (!partner) {
      return res.status(404).json("Partner not found");
    }
    const publicId = partner.image.split("/").pop().split(".")[0];
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });
    if (result.result !== "ok") {
      throw Error();
    }
    await Partner.findByIdAndDelete(partner._id);
    return res.status(200).json("Deleted");
  } catch (err) {
    console.log(err);
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

module.exports = {
  getPartnersController,
  createPartnerController,
  deletePartnerController,
};
