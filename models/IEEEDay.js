const mongoose = require("mongoose");
const ieeeDaySchema = new mongoose.Schema({
  url: String,
});

const IEEEDay = mongoose.model("IEEEDay", ieeeDaySchema);
exports.IEEEDay = IEEEDay;
