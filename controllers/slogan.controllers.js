const { Slogan } = require("../models/Slogan");

async function createSloganController(req, res) {
  try {
    await Slogan.deleteMany();
    await Slogan.create(req.body);
    return res.status(201).json("created");
  } catch (err) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function getSloganController(req, res) {
  try {
    const slogan = await Slogan.find();
    return res.status(200).json(slogan[0]);
  } catch (err) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

module.exports = { getSloganController, createSloganController };
