const mongoose = require("mongoose");
const committeeSchema = new mongoose.Schema(
  {
    name: String,
    chapter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chapter",
      required: false,
    },
    isTech: Boolean,
    chair: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    director: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    viceDirector: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    volunteers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    events: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Event",
      default: [],
    },
    participants: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
  },
  { timestamps: true }
);

const Committee = mongoose.model("Committee", committeeSchema);
exports.Committee = Committee;
