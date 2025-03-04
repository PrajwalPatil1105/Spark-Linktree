const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const express = require("express");
const authRoutes = express.Router();
const auth = require("../Middleware/auth.js");
const User = require("../Model/Userschema");

authRoutes.post("/signup", async (req, res) => {
  const { Fname, Lname, email, password } = req.body;
  const isUser = await User.findOne({ email });
  if (isUser) {
    return res.status(409).json({ message: "User Already Exists", code: "0" });
  }
  const hashpassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    Fname,
    Lname,
    email,
    password: hashpassword,
  });
  await newUser.save();
  return res.status(201).json({
    message: "Account Created Successfully",
    code: "1",
    id: newUser._id,
  });
});

authRoutes.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const isUser = await User.findOne({ username });

    if (!isUser) {
      return res
        .status(401)
        .json({ message: "Incorrect Username/Passowrd", code: "0" });
    }
    const isMatch = await bcrypt.compare(password, isUser.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Incorrect Username/Passowrd", code: "0" });
    }
    const token = jwt.sign(
      { id: isUser._id, name: isUser.name },
      process.env.JWT_SECRET
    );
    res.json({ token, message: "Login Successfull", code: "1" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

authRoutes.put("/update-profile/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { username, category } = req.body;
    if (username) {
      const existingUser = await User.findOne({ username });
      if (existingUser && existingUser._id.toString() !== id) {
        return res.status(409).json({
          message: "Username already taken",
          code: "0",
        });
      }
    }
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, category },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
        code: "0",
      });
    }
    return res.status(200).json({
      message: "Profile updated successfully",
      code: "1",
      user: {
        id: updatedUser._id,
        username: updatedUser.username,
        category: updatedUser.category,
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({
      message: "Something went wrong",
      code: "0",
    });
  }
});

module.exports = authRoutes;
