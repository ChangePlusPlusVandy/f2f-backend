const mongoose = require("mongoose");


const commentSchema= mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    content: {
        type: String,
    },
    votes: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;