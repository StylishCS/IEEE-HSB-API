const { Committee } = require("../models/Committee");

async function createCommitteeController(req, res) {
  try {
    const committee = await Committee.create(req.body);
    return res.status(201).json(committee);
  } catch (err) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

module.exports = { createCommitteeController };
