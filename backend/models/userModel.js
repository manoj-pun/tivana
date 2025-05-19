import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        fullname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        profileImage: {
            type: String,
        },
        profilePublicId: {
            type: String, 
            // required: true
        },
        userBio: {
            type: String,
            default: "No bio yet."
        },
        followingCount: {
            type: Number,  
            default: 0,
        },
        followersCount: {
            type: Number,  
            default: 0,
        },
        likedPosts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }],
        savedPosts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }],
        following: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        followers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
    },  
    {
        timestamps: true,
    }
);  

const userModel = mongoose.model("User", userSchema);
export default userModel;