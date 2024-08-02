const { IEEEDay } = require("../models/IEEEDay");
const cloudinary = require("../utils/cloudinary");

async function createIeeeDayController(req, res) {
  try {
    const day = await IEEEDay.find();
    if (day.length > 0) {
      const publicId = day[0].url.split("/").pop().split(".")[0];
      const result = await cloudinary.uploader.destroy(publicId, {
        resource_type: "video",
      });
      console.log(result);
      if (result.result !== "ok") {
        throw Error();
      }
      await IEEEDay.deleteMany();
    }
    req.body.url = req.cloudinaryResult.secure_url;
    await IEEEDay.create(req.body);
    return res.status(201).json("Created");
  } catch (err) {
    console.log(err);
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function getIeeeDayController(req, res) {
  try {
    const ieeeDay = await IEEEDay.find();
    return res.status(200).json(ieeeDay[0]);
  } catch (err) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

module.exports = { createIeeeDayController, getIeeeDayController };
