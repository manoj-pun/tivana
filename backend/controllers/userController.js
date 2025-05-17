import userModel from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";

export const uploadProfileImage = async (req, res) => {
  const profileImage = req.file;

  if (!profileImage) {
    return res.status(400).json({success: false,message: "Please select a profile picture.",});
  }

  const userId = req.user?.id;
  if (!userId) {return res.status(401).json({ success: false, message: "User not authorized" });
  }

  try {
    const user = await userModel.findById(userId);
    if (!user) {return res.status(404).json({ success: false, message: "User not found" });
    }

    // Delete old image if exists
    if (user.profilePublicId) {
      await cloudinary.uploader.destroy(user.profilePublicId)
        .catch(err => console.error("Error deleting old image:", err));
    }

    // Upload new image to Cloudinary
    const result = await cloudinary.uploader.upload(
      `data:${profileImage.mimetype};base64,${profileImage.buffer.toString('base64')}`,
      {
        folder: `tivana/users/${user.username}/profileInfo/UserProfileImage`,
        width: 500,
        height: 500,
        crop: "fill"
      }
    );

    // Update user document
    user.profileImage = result.secure_url;
    user.profilePublicId = result.public_id;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile picture uploaded successfully.",
      profileImage: user.profileImage
    });
  } catch (error) {
    // console.error("Upload error:", error);
    // return res.status(500).json({ 
    //   success: false, 
    //   message: "Failed to upload profile image" 
    // });
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
  const { username, fullname, userBio } = req.body;
  const profileImage = req.file; 

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
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Check username availability
    if (username !== user.username) {
      const exists = await userModel.findOne({ username });
      if (exists) {
        return res.status(409).json({ success: false, message: "Username already taken." });
      }
    }

    // Handle profile image if uploaded
    if (profileImage) {
      // Delete old image
      if (user.profilePublicId) {
        await cloudinary.uploader.destroy(user.profilePublicId)
          .catch(console.error);
      }

      // Upload new image
      const result = await cloudinary.uploader.upload(
        `data:${profileImage.mimetype};base64,${profileImage.buffer.toString('base64')}`,
        {
          folder: `tivana/users/${user.username}/profileInfo/UserProfileImage`,
          width: 500,
          height: 500,
          crop: "fill"
        }
      );

      user.profileImage = result.secure_url;
      user.profilePublicId = result.public_id;
    }

    // Update other fields
    user.username = username;
    user.fullname = fullname;
    user.userBio = userBio || "No bio yet.";
    
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated",
      user: {
        username: user.username,
        fullname: user.fullname,
        userBio: user.userBio,
        profileImage: user.profileImage
      }
    });

  } catch (error) {
    console.error("Edit error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Server error" 
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


export const getUserByUsername = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await userModel.findOne({ username })

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user by username:', error);
    res.status(500).json({ message: 'Server error' });
  }
};





