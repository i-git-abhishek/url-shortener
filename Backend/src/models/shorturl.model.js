import mongoose, {mongo} from "mongoose";

const shortUrlSchema = new mongoose.Schema({
    long_url:{
        type: String,
        required: true,
    },
    short_url: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    clicks: {
        type: Number,
        default: 0,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 604800
    },
});

const shortURL = mongoose.model("shortURL", shortUrlSchema);

export default shortURL; 