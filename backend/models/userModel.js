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
        userBio:{
            type: String,
            default: "No bio yet."
        },
        following:{
            type: String,
            default: 10,
        },
        followers:{
            type: String,
            default: 10,
        }
    },  
    {
        timestamps: true,
    }
);  

const userModel = mongoose.model("User", userSchema);
export default userModel;

