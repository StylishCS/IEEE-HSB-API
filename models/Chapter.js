const mongoose = require("mongoose");
const chapterSchema = new mongoose.Schema(
  {
    chair: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    name: String,
    committees: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Committee",
      default: [],
    },
  },
  { timestamps: true }
);
const Chapter = mongoose.model("Chapter", chapterSchema);
exports.Chapter = Chapter;
