const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema({
  image: String,
  date: Date,
  location: String,
  url: String,
});

const Event = mongoose.model("Event", eventSchema);
exports.Event = Event;
