const { Member } = require("../models/Member");
const cloudinary = require("../utils/cloudinary");
async function createFamilyMemberController(req, res) {
  try {
    req.body.image = req.cloudinaryResult.secure_url;
    await Member.create(req.body);
    return res.status(201).json("created");
  } catch (err) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function getFamilyMembersController(req, res) {
  try {
    const members = await Member.find();
    return res.status(200).json(members);
  } catch (err) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function deleteFamilyMemberController(req, res) {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json("member not found");
    }
    const publicId = member.image.split("/").pop().split(".")[0];
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });
    if (result.result !== "ok") {
      throw Error();
    }
    await Member.findByIdAndDelete();
    return res.status(200).json("deleted");
  } catch (err) {
    console.log(err);
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

module.exports = {
  createFamilyMemberController,
  deleteFamilyMemberController,
  getFamilyMembersController,
};
