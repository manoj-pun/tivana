import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    thumbnailPublicId: { // To remove post from cloudinary
        type: String, 
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dropdowns: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dropdown"
    }],
    // Array of users who liked this post
    likedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    // Array of users who saved this post
    savedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
}, {
    timestamps: true,
});

const postModel = mongoose.model("Post", postSchema);

export default postModel;