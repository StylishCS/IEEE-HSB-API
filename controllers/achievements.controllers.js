const { Achievement } = require("../models/Achievements");

async function addAchievementsController(req, res) {
  try {
    let achievement = await Achievement.find();
    if (!achievement[0]) {
      await Achievement.create(req.body);
    }
    await Achievement.findByIdAndUpdate(achievement[0]._id, req.body);
    return res.status(200).json("ok");
  } catch (err) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function getAchievementsController(req, res) {
  try {
    let achievement = await Achievement.find();
    if (!achievement[0]) {
      return res.status(404).json("Not Found");
    }
    return res.status(200).json(achievement[0]);
  } catch (err) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

module.exports = { addAchievementsController, getAchievementsController };
