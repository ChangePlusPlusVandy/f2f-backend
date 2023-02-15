const mongoose = require("mongoose");
const ObjectId = require('mongodb').ObjectId;

const commentSchema= mongoose.Schema({
    userId: {
        type: ObjectId
    },
    postId: {
        type: ObjectId
    },
    body: {
        type: String
    },
    upVotes: {
        type: Number
    },
}, {
    timestamps: true,
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;