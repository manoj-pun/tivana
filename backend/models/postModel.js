import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    thumbnailPublicId: { //To remove post from cloudinary
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
    }]
}, {
    timestamps: true,
});

const Post = mongoose.model("Post", postSchema);

export default Post;