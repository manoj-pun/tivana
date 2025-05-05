import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // required: true
    },

    username: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required:true
    },
    description:{
        type: String,
        required: true
    },
    dropdowns:[{
        title: {
            type: String,
            required: true
        },
        subTitle: {
            type: String,
        },
        dropdownImages:[{
            type: String,
            required: true
        }],
        description: {
            type: String,
            required: true
        }
    }]
    }
);

const postModel = mongoose.model("Post", postSchema);

export default postModel;