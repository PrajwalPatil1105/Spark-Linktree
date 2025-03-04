const mongoose = require("mongoose");

const Userschema = new mongoose.Schema({
  Fname: {
    type: String,
    required: true,
  },
  Lname: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    sparse: true,
  },
  category: {
    type: String,
  },
  bio: {
    type: String,
    default: "",
  },
  profileImage: {
    type: String,
    default: "/default-avatar.png",
  },
  bannerColor: {
    type: String,
    default: "#3A3A3A",
  },
  layout: {
    type: String,
    default: "stack",
  },
  theme: {
    type: String,
    default: "air-snow",
  },
  special: {
    type: String,
    default: "none",
  },
  buttonStyle: {
    type: {
      type: String,
      default: "fill",
    },
    backgroundColor: {
      type: String,
      default: "#C9C9C9",
    },
    textColor: {
      type: String,
      default: "#000000",
    },
    borderRadius: {
      type: String,
      default: "lg",
    },
    fontFamily: {
      type: String,
      default: "Poppins",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = new mongoose.model("User", Userschema);
module.exports = User;
