const mongoose = require("mongoose");
const ObjectId = require('mongodb').ObjectId;

const postSchema= mongoose.Schema({
    userId: {
        type: ObjectId
    },
    heading: {
        type: String
    },
    body: {
        type: String
    },
    upVotes: {
        type: Number
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