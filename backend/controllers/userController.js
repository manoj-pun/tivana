import userModel from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";

export const uploadProfilePicture = async (req, res) => {
    const imageFile = req.file;

    if (!imageFile) {
        return res.json({ success: false, message: "Please select the profile picture" });
    }

    const username = req.user?.username;

    if (!username) {
        return res.json({ success: false, message: "User not authorized" });
    }

    try {
        const result = await cloudinary.uploader.upload(imageFile.path, {
            folder: `tivana/users/${username}/profile`,
        });

        return res.json({ success: true, message: "Profile picture uploaded", username, imageUrl: result.secure_url });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export const getUserData = async(req,res) => {
    try {
        const userId = req.user?.id;

        const user = await userModel.findById(userId);
        // console.log(user)

        if(!user){
            return res.json({success:false,message:"User not found"});
        }

        res.json({
            success:true,
            userData:{
                username:user.username,
                fullname:user.fullname,
            }
        });

    } catch (error) {
        res.json({success:false,message:error.message})
    }
}