const { Intro } = require("../models/Intro");
const cloudinary = require("../utils/cloudinary");

async function createIntroController(req, res) {
  try {
    const intro = await Intro.find();
    if (intro.length > 0) {
      const publicId = intro[0].url.split("/").pop().split(".")[0];
      const result = await cloudinary.uploader.destroy(publicId, {
        resource_type: "video",
      });
      if (result.result !== "ok") {
        throw Error();
      }
      await Intro.deleteMany();
    }
    req.body.url = req.cloudinaryResult.secure_url;
    await Intro.create(req.body);
    return res.status(201).json("Created");
  } catch (err) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function getIntroController(req, res) {
  try {
    const intro = await Intro.find();
    return res.status(200).json(intro[0]);
  } catch (err) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

module.exports = { createIntroController, getIntroController };
