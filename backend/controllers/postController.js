import postModel from "../models/postModel.js";
import userModel from "../models/userModel.js";
import dropdownModel from "../models/dropdownModel.js";
import { v2 as cloudinary } from "cloudinary";

export const uploadPost = async (req, res) => {
  try {
    const description = req.body.description;
    const thumbnailImage = req.files?.thumbnailImage?.[0];
    const dropdownImages = req.files?.dropdownImages || [];
    const dropdownData = req.body.dropdown ? JSON.parse(req.body.dropdown) : [];
    const userId = req.user.id;

    if (!description || !thumbnailImage) {
      return res.status(400).json({success: false,message: "Description and thumbnail are required."});
    }

    const user = await userModel.findById(userId);
    if (!user) {return res.status(404).json({success: false,message: "User not found."});
    }

    // Upload thumbnail
    const thumbnailResult = await cloudinary.uploader.upload(
      `data:${thumbnailImage.mimetype};base64,${thumbnailImage.buffer.toString("base64")}`,
      {
        folder: `tivana/users/${user.username}/profileInfo/UserProfileThumbnail`,
        resource_type: "auto",
      }
    );

    // Create post
    const newPost = await postModel.create({
      description,
      thumbnail: thumbnailResult.secure_url,
      thumbnailPublicId: thumbnailResult.public_id,
      userId: user._id,
    });

    // Process dropdowns
    const createdDropdowns = [];
    let currentImageIndex = 0;

    for (const dropdownItem of dropdownData) {
      const imagesToUpload = dropdownImages.slice(
        currentImageIndex,
        currentImageIndex + dropdownItem.imageCount
      );
      currentImageIndex += dropdownItem.imageCount;

      const uploadedImages = [];
      for (const file of imagesToUpload) {
        const result = await cloudinary.uploader.upload(
          `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
          {
            folder: `tivana/users/${user.username}/profileInfo/UserProfileDropdowns`,
            resource_type: "auto",
          }
        );
        uploadedImages.push({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }

      const newDropdown = await dropdownModel.create({
        postId: newPost._id,
        title: dropdownItem.title,
        subTitle: dropdownItem.subtitle || "",
        images: uploadedImages,
        description: dropdownItem.description,
      });

      createdDropdowns.push(newDropdown);
    }

    // Update post with dropdown references
    newPost.dropdowns = createdDropdowns;
    await newPost.save();

    return res.status(201).json({success: true,message: "Post uploaded.",post: newPost,
      dropdowns: createdDropdowns,
    });
  } catch (error) {
    return res.status(500).json({success: false,message: error.message});
  }
};

//get all the posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await postModel.find()
      .populate("userId", "fullname username profileImage isVerified")
      .populate("dropdowns")
      .populate({
        path: "comments",
        options: { sort: { createdAt: -1 } }, // Sort comments newest first
        populate: {
          path: "userId",
          select: "username profileImage isVerified"
        }
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//get post by id
export const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await postModel
      .findById(id)
      .populate("userId", "fullname username profileImage"); // populate user info (optional)

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found." });
    }

    res.status(200).json({ success: true, post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//delete post
export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    // Find post and populate dropdowns
    const post = await postModel.findById(id).populate('dropdowns');
    
    if (!post) {
      return res.status(404).json({ 
        success: false, 
        message: "Post not found." 
      });
    }

    // Delete thumbnail from Cloudinary
    if (post.thumbnailPublicId) {
      await cloudinary.uploader.destroy(post.thumbnailPublicId)
        .catch(err => console.error("Error deleting thumbnail:", err));
    }

    // Delete all dropdown images from Cloudinary
    if (post.dropdowns && post.dropdowns.length > 0) {
      for (const dropdown of post.dropdowns) {
        // Delete each image in the dropdown
        for (const image of dropdown.images) {
          await cloudinary.uploader.destroy(image.publicId)
            .catch(err => console.error("Error deleting dropdown image:", err));
        }
        // Delete the dropdown document
        await dropdownModel.findByIdAndDelete(dropdown._id)
          .catch(err => console.error("Error deleting dropdown:", err));
      }
    }

    // Finally delete the post
    await postModel.findByIdAndDelete(id);

    return res.status(200).json({ 
      success: true, 
      message: "Post and all associated data deleted." 
    });

  } catch (error) {
    console.error("Delete post error:", error);
    return res.status(500).json({ 
      success: false, 
      message: error.message || "Failed to delete post" 
    });
  }
};
