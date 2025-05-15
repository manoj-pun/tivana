import mongoose from "mongoose";

const dropdownSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    subTitle: {
        type: String,
    },
    images: [{
        url: {
            type: String,
            required: true
        },
        publicId: {
            type: String,
            required: true
        }
    }],
    description: {
        type: String,
        required: true
    }
});

const Dropdown = mongoose.model("Dropdown", dropdownSchema);

export default Dropdown;