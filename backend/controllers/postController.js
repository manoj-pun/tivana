import postModel from "../models/postModel.js";
import userModel from "../models/userModel.js";
import { v2 as cloudinary } from 'cloudinary';

//Upload post 
export const uploadPost = async (req, res) => {
    const { description } = req.body;
    const thumbnailImage = req.file;

    if (!description) {
        return res.status(400).json({ success: false, message: "Description is required." });
    }

    if (!thumbnailImage) {
        return res.status(400).json({ success: false, message: "Thumbnail Image is required." });
    }

    const userId = req.user?.id;
    if (!userId) {
        return res.status(401).json({ success: false, message: "User not authorized" });
    }

    try {
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found." });
        }

        // Upload thumbnail image to Cloudinary
        const result = await cloudinary.uploader.upload(thumbnailImage.path, {
            folder: `tivana/users/${user.username}/profileInfo/UserProfileThumbnail`
        });

        const newPost = await postModel.create({
            description,
            thumbnail: result.secure_url,
            thumbnailPublicId: result.public_id,
            userId: user._id,
        });

        return res.status(201).json({ success: true, message: "Post uploaded successfully", post: newPost });
    } catch (error) {
        // console.error("Upload post error:", error);
        return res.status(500).json({ success: false, message:error.message});
    }
};



//get all the posts
export const getAllPosts = async (req, res) => {
    try {
        const posts = await postModel
            .find()
            .populate("userId", "fullname username profileImage") // populate specific fields from user
            .sort({ createdAt: -1 }); //get latest first

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
            return res.status(404).json({ success: false, message: "Post not found." });
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
        const post = await postModel.findById(id);

        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found." });
        }

        // Delete thumbnail from Cloudinary
        if (post.thumbnailPublicId) {
            await cloudinary.uploader.destroy(post.thumbnailPublicId);
        }

        // console.log("Cloudinary Public ID:", post.thumbnailPublicId);

        await postModel.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: "Post deleted successfully." });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};




