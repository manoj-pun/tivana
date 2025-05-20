import userModel from "../models/userModel.js";
import postModel from "../models/postModel.js";
import { v2 as cloudinary } from "cloudinary";
import commentModel from "../models/CommentModel.js";

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
        userBio:user.userBio,
        likedPosts: user.likedPosts,
        savedPosts: user.savedPosts,
        isVerified: user.isVerified
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


export const likePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.user.id; // Get from auth middleware instead of body

        const [user, post] = await Promise.all([
            userModel.findById(userId),
            postModel.findById(postId)
        ]);

        if (!post) return res.status(404).json({ message: "Post not found" });
        if (!user) return res.status(404).json({ message: "User not found" });

        if (user.likedPosts.includes(postId)) {
            return res.status(400).json({ message: "Post already liked" });
        }

        await Promise.all([
            userModel.findByIdAndUpdate(userId, { $addToSet: { likedPosts: postId } }),
            postModel.findByIdAndUpdate(postId, { $addToSet: { likedBy: userId } })
        ]);

        return res.status(200).json({ 
            message: "Post liked successfully",
            likeCount: post.likedBy.length + 1
        });
    } catch (error) {
        return res.status(500).json({ message: "Error liking post", error: error.message });
    }
};

export const unlikePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.user.id;

        const [user, post] = await Promise.all([
            userModel.findById(userId),
            postModel.findById(postId)
        ]);

        if (!post) return res.status(404).json({ message: "Post not found" });
        if (!user) return res.status(404).json({ message: "User not found" });

        if (!user.likedPosts.includes(postId)) {
            return res.status(400).json({ message: "Post not previously liked" });
        }

        await Promise.all([
            userModel.findByIdAndUpdate(userId, { $pull: { likedPosts: postId } }),
            postModel.findByIdAndUpdate(postId, { $pull: { likedBy: userId } })
        ]);

        return res.status(200).json({ 
            message: "Post unliked successfully",
            likeCount: post.likedBy.length - 1
        });
    } catch (error) {
        return res.status(500).json({ message: "Error unliking post", error: error.message });
    }
};

export const savePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.user.id;

        const [user, post] = await Promise.all([
            userModel.findById(userId),
            postModel.findById(postId)
        ]);

        if (!post) return res.status(404).json({ message: "Post not found" });
        if (!user) return res.status(404).json({ message: "User not found" });

        if (user.savedPosts.includes(postId)) {
            return res.status(400).json({ message: "Post already saved" });
        }

        await Promise.all([
            userModel.findByIdAndUpdate(userId, { $addToSet: { savedPosts: postId } }),
            postModel.findByIdAndUpdate(postId, { $addToSet: { savedBy: userId } })
        ]);

        return res.status(200).json({ 
            message: "Post saved successfully",
            saveCount: post.savedBy.length + 1
        });
    } catch (error) {
        return res.status(500).json({ message: "Error saving post", error: error.message });
    }
};

export const unsavePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.user.id;

        const [user, post] = await Promise.all([
            userModel.findById(userId),
            postModel.findById(postId)
        ]);

        if (!post) return res.status(404).json({ message: "Post not found" });
        if (!user) return res.status(404).json({ message: "User not found" });

        if (!user.savedPosts.includes(postId)) {
            return res.status(400).json({ message: "Post not previously saved" });
        }

        await Promise.all([
            userModel.findByIdAndUpdate(userId, { $pull: { savedPosts: postId } }),
            postModel.findByIdAndUpdate(postId, { $pull: { savedBy: userId } })
        ]);

        return res.status(200).json({ 
            message: "Post unsaved successfully",
            saveCount: post.savedBy.length - 1
        });
    } catch (error) {
        return res.status(500).json({ message: "Error unsaving post", error: error.message });
    }
};

// Add comment to a post
export const addComment = async (req, res) => {
    try {
        const { comment } = req.body;
        const { postId } = req.params;
        const userId = req.user.id;

        // Validate input
        if (!comment) {
            return res.status(400).json({
                success: false,
                message: "Comment text is required"
            });
        }

        // Check if post exists
        const post = await postModel.findById(postId);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        // Create new comment
        const newComment = await commentModel.create({
            postId,
            userId,
            comment
        });

        await newComment.save();

        // Add comment reference to the post
        await postModel.findByIdAndUpdate(postId, {
            $push: { comments: newComment._id }
        });

        // Populate user details for the response
        const populatedComment = await commentModel.findById(newComment._id)
            .populate('userId', 'username profileImage isVerified');

        res.status(201).json({
            success: true,
            message: "Comment added successfully",
            comment: populatedComment
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get comments for a post
export const getPostComments = async (req, res) => {
    try {
        const { postId } = req.params;

        const comments = await commentModel.find({ postId })
            .populate('userId', 'username profileImage isVerified')
            .sort({ createdAt: -1 })
            .lean();

        res.status(200).json({
            success: true,
            comments
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//verify user
export const verifyUser = async (req, res) => {
  try {
    const userId  = req.user?.id;
    
    // Check if user exists
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Update verification status
    user.isVerified = true;
    await user.save();

    res.status(200).json({
      success: true,
      message: "User verified successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};






