const mongoose = require("mongoose");
const ObjectId = require('mongodb').ObjectId;

const commentSchema= mongoose.Schema({
    userId: {
        type: ObjectId,
        required: true,
        unique: true
    },
    postId: {
        type: ObjectId,
        required: true,
        unique: true
    },
    body: {
        type: String
    },
    upVotes: {
        type: Number,
        default: 0
    },
}, {
    timestamps: true,
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;