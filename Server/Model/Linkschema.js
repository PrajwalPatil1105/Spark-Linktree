const mongoose = require("mongoose");

const LinkSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  platformName: {
    type: String,
    trim: true,
  },
  platformIcon: {
    type: String,
    trim: true,
  },
  totalClicks: {
    type: Number,
    default: 0,
  },
  clickDetails: [
    {
      os: {
        type: String,
      },
      clickedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Link = new mongoose.model("Link", LinkSchema);
module.exports = Link;
