const mongoose = require("mongoose");
const ObjectId = require('mongodb').ObjectId;

const commentSchema= mongoose.Schema({
    userId: {
        type: ObjectId
    },
    postId: {
        type: ObjectId
    },
    upVotes: {
        type: Number
    },
    replies: {
        type: [ObjectId],
        default:[]
    }
}, {
    timestamps: true,
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;