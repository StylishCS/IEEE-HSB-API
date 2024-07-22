const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: {
      type: String,
      default: "",
    },
    phone: String,
    faculty: String,
    level: Number,
    linkedIn: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    category: String,
    role: {
      type: String,
      required: false,
    },
    chapter: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Chapter",
      default: [],
    },
    committee: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Committee",
      default: [],
    },
    track: {
      type: String,
      required: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
    refreshToken: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
exports.User = User;
