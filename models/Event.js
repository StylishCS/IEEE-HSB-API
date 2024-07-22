const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    location: String,
    attendees: {
      type: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
          attended: {
            type: Boolean,
            default: false,
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

exports.Event = Event;
