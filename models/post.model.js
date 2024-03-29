const mongoose = require("mongoose");
const ObjectId = require('mongodb').ObjectId;

const postSchema= mongoose.Schema({
    userId: {
        type: ObjectId,
        trim: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String
    },
    body: {
        type: String
    },
    upVotes: {
        type: Number,
        default: 0
    },
    disabilityTags: {
        type: [String], 
        default: [],
    },
    comments: {
        type: [ObjectId]
    },
    media: {
        type: String
    }
}, {
    timestamps: true,
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;