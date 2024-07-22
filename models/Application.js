const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  _id: false,
  question: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  selections: {
    type: [String],
    required: false,
  },
  answer: {
    type: String,
    default: "",
  },
});

const applicationSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    form: {
      type: [formSchema],
      required: true,
    },
    answers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "ApplicationAnswer",
      default: [],
    },
    date: {
      type: [Date],
      required: true,
    },
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", applicationSchema);

module.exports = { Application };
