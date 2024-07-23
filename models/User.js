const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: {
      type: String,
      required: true,
    },
    phone: String,
    faculty: String,
    level: Number,
    linkedIn: String,
    image: String,
    category: String,
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
    otp: {
      code: {
        type: String,
        default: null,
      },
      expire: {
        type: Date,
        default: null,
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
exports.User = User;
