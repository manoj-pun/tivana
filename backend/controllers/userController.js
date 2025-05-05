import userModel from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";

export const uploadProfilePicture = async (req, res) => {
  const profileImage = req.file;

  if (!profileImage) {
    return res.json({
      success: false,
      message: "Please select the profile picture",
    });
  }

  const userId = req.user?.id;
  if (!userId) {
    return res.json({ success: false, message: "User not authorized" });
  }

  const userDoc = await userModel.findById(userId);
  if (!userDoc) {
    return res.json({ success: false, message: "User not found" });
  }

  const username = userDoc.username;
  const fullname = userDoc.fullname;

  try {
    // Upload the profile picture to Cloudinary
    const result = await cloudinary.uploader.upload(profileImage.path, {
      folder: `tivana/users/${username}/profileInfo/UserProfileImage`,
    });

    // Now, update the user's profileImage field in the database
    userDoc.profileImage = result.secure_url; // Update the profileImage with the Cloudinary URL
    await userDoc.save(); // Save the updated user document

    return res.json({
      success: true,
      message: "Profile picture uploaded and saved",
      username,
      fullname,
      imageUrl: result.secure_url, // Return the uploaded image URL
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};


export const getUserData = async (req, res) => {
  try {
    const userId = req.user?.id;

    const user = await userModel.findById(userId);
    // console.log(user)

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      userData: {
        username: user.username,
        fullname: user.fullname,
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const userId = req.user?.id; // Optional for auth check

    // Get only the essential profile data
    const user = await userModel
      .findOne({ username })
      .select("username fullname profileImage");

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      user: {
        username: user.username,
        name: user.fullname, 
        profileImage: user.profileImage
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
