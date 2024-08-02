const { Event } = require("../models/Event");

async function createEventController(req, res) {
  try {
    req.body.image = req.cloudinaryResult.secure_url;
    await Event.create(req.body);
    return res.status(201).json("Created");
  } catch (err) {
    console.log(err);
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function getEventsController(req, res) {
  try {
    const events = await Event.find();
    return res.status(200).json(events);
  } catch (err) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

module.exports = { getEventsController, createEventController };
