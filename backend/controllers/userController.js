import userModel from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";

export const uploadProfileImage = async (req, res) => {
  const profileImage = req.file;

  if (!profileImage) {
    return res.status(400).json({
      success: false,
      message: "Please select a profile picture.",
    });
  }

  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ success: false, message: "User not authorized" });
  }

  try {
    // Find user directly and check
    const user = await userModel.findById(userId);
    // console.log(user)
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(profileImage.path, {
      folder: `tivana/users/${user.username}/profileInfo/UserProfileImage`,
    });

    // Update user document
    user.profileImage = result.secure_url;
    user.profilePublicId = result.public_id;
    await user.save();

    return res.json({
      success: true,
      message: "Profile picture uploaded successfully.",
      profileImage: user.profileImage,
      profilePublicId: user.profilePublicId
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


//Remove profile picture
export const removeProfileImage = async(req,res) => {
  const userId = req.user.id;

  try{
    const user = await userModel.findById(userId)
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }

    // Delete old image from Cloudinary
    if (user.profilePublicId) {
      await cloudinary.uploader.destroy(user.profilePublicId);
    }

    user.profileImage = "";
    await user.save();

    return res.json({
      success: true,
      message: "Profile picture removed.",
    });
  }catch(error){
    return res.status(500).json({ success: false, message: error.message });
  }
}


export const editProfile = async (req, res) => {
  const { username, fullname, userBio,profileImage } = req.body;

  // Validate required fields
  if (!username || username.trim() === "") {
    return res.status(400).json({ success: false, message: "Username is required." });
  }

  if (!fullname || fullname.trim() === "") {
    return res.status(400).json({ success: false, message: "Name is required." });
  }

  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ success: false, message: "User not authorized" }); // 401 for unauthorized
  }

  try {
    // Check if user exists
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" }); // 404 for not found
    }

    // Check if username is already taken by another user
    if (username !== user.username) {
      const usernameExists = await userModel.findOne({ username });
      if (usernameExists) {
        return res.status(409).json({ success: false, message: "Username already taken." }); // 409 for conflict
      }
    }

    user.username = username;
    user.fullname = fullname;
    user.userBio = userBio?.trim() === "" ? "No bio yet." : userBio;
    if (profileImage) { 
      user.profileImage = profileImage;
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: user._id,
        username: user.username,
        fullname: user.fullname,
        userBio: user.userBio,
        profileImage: user.profileImage
      }
    });

  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
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
        userId: user.id,
        username: user.username,
        fullname: user.fullname,
        profileImage:user.profileImage,
        followersCount: user.followersCount,
        followingCount:user.followingCount,
        userBio:user.userBio
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// export const getUserProfile = async (req, res) => {
//   try {
//     const { username } = req.params;
//     const userId = req.user?.id; // Optional for auth check

//     // Get only the essential profile data
//     const user = await userModel
//       .findOne({ username })
//       .select("username fullname profileImage");

//     if (!user) {
//       return res.json({ success: false, message: "User not found" });
//     }

//     res.json({
//       success: true,
//       user: {
//         username: user.username,
//         name: user.fullname, 
//         profileImage: user.profileImage
//       },
//     });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };
