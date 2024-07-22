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

const formAnswerSchema = new mongoose.Schema(
  {
    form: {
      type: [formSchema],
      required: true,
    },
    application: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
    },
    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

const ApplicationAnswer = mongoose.model("ApplicationAnswer", formAnswerSchema);
exports.ApplicationAnswer = ApplicationAnswer;
