import userModel from "../models/userModel.js";
import postModel from "../models/postModel.js";
import {v2 as cloudinary} from "cloudinary"

export const uploadPost = async (req, res) => {
  try {
    const { description, hasDropdowns } = req.body;
    const thumbnailFile = req.file;

    // Validate image
    if (!thumbnailFile) {
      return res.json({ success: false, message: "Image is required" });
    }

    // Validate user
    const userId = req.user?.id;
    if (!userId) {
      return res.json({ success: false, message: "User not authorized" });
    }

    const userDoc = await userModel.findById(userId);
    if (!userDoc) {
      return res.json({ success: false, message: "User not found" });
    }

    const username = userDoc.username;

    // Parse dropdowns (only if user clicked "Add Dropdowns")
    let dropdowns = [];
    let cloudinaryFolder = `tivana/users/${username}/profileInfo/UserPosts`; // Default folder

    if (hasDropdowns === "true") {
      // Change folder for dropdown posts
      cloudinaryFolder = `tivana/users/${username}/profileInfo/UserPosts/dropdownPosts`;

      if (!req.body.dropdowns) {
        return res.json({
          success: false,
          message: "Dropdowns are required when added",
        });
      }

      try {
        dropdowns = JSON.parse(req.body.dropdowns);
        if (!Array.isArray(dropdowns)) {
          return res.json({
            success: false,
            message: "Dropdowns must be an array",
          });
        }
      } catch (err) {
        return res.json({
          success: false,
          message: "Invalid dropdowns format",
        });
      }
    }

    // Upload image to the appropriate folder
    const result = await cloudinary.uploader.upload(thumbnailFile.path, {
      folder: cloudinaryFolder, // Uses either default or dropdownPosts folder
    });

    // Save post
    const newPost = new postModel({
      userId: userId,
      username,
      description,
      thumbnail: result.secure_url,
      dropdowns,
      postType: hasDropdowns === "true" ? "dropdown" : "regular", // Optional: track post type
    });

    await newPost.save();

    // Populate user data in response
    const populatedPost = await postModel
      .findById(newPost._id)
      .populate("userId", "username fullname profileImage");

    res.json({
      success: true,
      message: "Post uploaded successfully",
      post: populatedPost,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
