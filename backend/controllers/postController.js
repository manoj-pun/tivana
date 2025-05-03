import postModel from "../models/postModel.js";
import { v2 as cloudinary } from "cloudinary";

export const uploadPost = async (req, res) => {
    try {
        const { description } = req.body;
        const thumbnailFile = req.file;

        if (!thumbnailFile) {
            return res.json({ success: false, message: "Image is required" });
        }

        const username = req.user?.username;

        if (!username) {
            return res.json({ success: false, message: "User not authorized" });
        }

        // ✅ Parse dropdowns if it's a string
        let dropdowns = [];
        if (req.body.dropdowns) {
            try {
                dropdowns = JSON.parse(req.body.dropdowns);
                if (!Array.isArray(dropdowns)) {
                    return res.json({ success: false, message: "Dropdowns must be an array" });
                }
            } catch (err) {
                return res.json({ success: false, message: "Invalid dropdowns format" });
            }
        } else {
            return res.json({ success: false, message: "Dropdowns are required and must be an array" });
        }

        const result = await cloudinary.uploader.upload(thumbnailFile.path, {
            folder: `tivana/users/${username}/profileinfo`,
        });

        const newPost = new postModel({
            username,
            description,
            thumbnail: result.secure_url,
            dropdowns,
        });

        await newPost.save();

        res.json({ success: true, message: "Post uploaded successfully" ,newPost});
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
