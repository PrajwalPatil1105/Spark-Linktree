const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { nanoid } = require("nanoid");
const User = require("../Model/Userschema");
const Link = require("../Model/Linkschema");
const UAParser = require("ua-parser-js");
const useragent = require("express-useragent");
const auth = require("../Middleware/auth.js");
dotenv.config();

router.get("/UserData", auth(), async (req, res) => {
  try {
    let userId = req.User?.id;
    const userData = await User.findById(userId);
    if (!userData) {
      return res.status(404).json({ message: "User Not Found", code: "0" });
    }

    res.json({ userData });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/Userdata/:id", async (req, res) => {
  try {
    let userId = req.params.id;
    const userData = await User.findById(userId);
    if (!userData) {
      return res.status(404).json({ message: "User Not Found", code: "0" });
    }

    res.json({ userData });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/Addlink", auth(), async (req, res) => {
  try {
    const { url, title, type, enabled, platform, platformName, platformIcon } =
      req.body;

    const newLink = new Link({
      user: req.User.id,
      url,
      title,
      type,
      enabled: enabled || true,
      platform,
      platformName,
      platformIcon,
      clicks: 0,
      createdAt: Date.now(),
    });
    const savedLink = await newLink.save();
    res.status(201).json({
      code: "1",
      message: "Link Added successfully",
    });
  } catch (error) {
    console.error("Error creating link:", error);
    res.status(500).json({
      code: "0",
      message: "Server error",
      error: error.message,
    });
  }
});

router.get("/LinkData", auth(), async (req, res) => {
  try {
    let userId = req.User?.id;
    const LinkData = await Link.find({ user: userId });
    if (!LinkData) {
      res.status(404).json({ messahe: "User Not Found", code: "0" });
    }
    res.json({ LinkData });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/Linkdata/:id", async (req, res) => {
  try {
    let userId = req.params.id;
    const LinkData = await Link.find({ user: userId });
    if (!LinkData) {
      res.status(404).json({ messahe: "User Not Found", code: "0" });
    }
    res.json({ LinkData });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.put("/updateUserData", auth(), async (req, res) => {
  try {
    const userId = req.User.id;

    const {
      Fname,
      username,
      bio,
      profileImage,
      bannerColor,
      layout,
      theme,
      special,
      buttonStyle,
      category,
    } = req.body;

    // Find the user and update their data
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (Fname) user.Fname = Fname;
    if (username) user.username = username;
    if (bio !== undefined) user.bio = bio;
    if (profileImage) user.profileImage = profileImage;
    if (bannerColor) user.bannerColor = bannerColor;
    if (layout) user.layout = layout;
    if (theme) user.theme = theme;
    if (special) user.special = special;
    if (category) user.category = category;

    if (buttonStyle) {
      user.buttonStyle = {
        type: buttonStyle.type || user.buttonStyle.type,
        backgroundColor:
          buttonStyle.backgroundColor || user.buttonStyle.backgroundColor,
        textColor: buttonStyle.textColor || user.buttonStyle.textColor,
        borderRadius: buttonStyle.borderRadius || user.buttonStyle.borderRadius,
        fontFamily: buttonStyle.fontFamily || user.buttonStyle.fontFamily,
      };
    }

    await user.save();

    res.status(200).json({
      message: "User data updated successfully",
      userData: user,
    });
  } catch (error) {
    console.error("Error updating user data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/updateUserProfile", auth(), async (req, res) => {
  try {
    const userId = req.User.id;
    const { username, bio, bannerColor } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (username) user.username = username;
    if (bio !== undefined) user.bio = bio;
    if (bannerColor) user.bannerColor = bannerColor;

    await user.save();

    res.status(200).json({
      message: "User profile updated successfully",
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/deleteLink/:linkId", auth(), async (req, res) => {
  try {
    const { linkId } = req.params;
    const link = await Link.findById(linkId);
    if (!link) {
      return res.status(404).json({ message: "Link not found" });
    }
    if (link.user.toString() !== req.User.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    await Link.findByIdAndDelete(linkId);
    res.status(200).json({
      message: "Link deleted successfully",
      linkId: linkId,
    });
  } catch (error) {
    console.error("Error deleting link:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/updateLink/:linkId", auth(), async (req, res) => {
  try {
    const { linkId } = req.params;
    const { url, title, type, enabled, platform, platformName, platformIcon } =
      req.body;
    const link = await Link.findById(linkId);
    if (!link) {
      return res.status(404).json({
        message: "Link not found",
        code: "0",
      });
    }

    // Check if the user owns this link
    if (link.user.toString() !== req.User.id) {
      return res.status(403).json({
        message: "Unauthorized",
        code: "0",
      });
    }
    if (url !== undefined) link.url = url;
    if (title !== undefined) link.title = title;
    if (type !== undefined) link.type = type;
    if (enabled !== undefined) link.enabled = enabled;
    if (platform !== undefined) link.platform = platform;
    if (platformName !== undefined) link.platformName = platformName;
    if (platformIcon !== undefined) link.platformIcon = platformIcon;
    await link.save();
    res.status(200).json({
      message: "Link updated successfully",
      code: "1",
      link: link,
    });
  } catch (error) {
    console.error("Error updating link:", error);
    res.status(500).json({
      message: "Server error",
      code: "0",
    });
  }
});

router.put("/edituserdata", auth(), async (req, res) => {
  try {
    const id = req.User.id;
    const { firstName, lastName, email, password } = req.body;
    const existingUser = await User.findById(id);

    const updateData = {
      Fname: firstName,
      Lname: lastName,
      email: email,
    };

    if (password) {
      const isPasswordChanged = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (!isPasswordChanged) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updateData.password = hashedPassword;

        return res.status(200).json({
          message: "User data updated need to re Login",
          code: "3",
          updatedUser: await User.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
          }),
        });
      }
    }
    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      message: "User data updated successfully",
      code: "1",
    });
  } catch (error) {
    console.error("Error updating user data:", error);
    res.status(500).json({
      message: "Error updating user data",
      error: error.message,
    });
  }
});

router.get("/forward/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const parser = new UAParser(req.headers["user-agent"]);
    const result = parser.getResult();
    const osType = result.os.name;

    const link = await Link.findByIdAndUpdate(
      id,
      {
        $inc: { totalClicks: 1 },
        $push: {
          clickDetails: {
            os: osType,
            clickedAt: new Date(),
          },
        },
      },
      { new: true }
    );

    if (!link) {
      return res.status(404).json({ message: "Link not found" });
    }
    res.status(200).json({
      url: link.url,
      message: "Link found and tracked",
    });
  } catch (error) {
    console.error("Redirect error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
