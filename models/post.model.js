const mongoose = require("mongoose");
const Comment = require('../models/comment.model.js');




const postSchema= mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    disabilityTags:{
        type: Array,
        default: [],
    },
    heading:{
        type: String,
        required: true,
        //max of 100 characters
        max: 100,
        trim: true
    },
    description:{
        type: String,
        required: true,
        //max of 500 characters
        max: 500,
        trim: true
    },
    votes: {
        type: Number,
        default: 0,
    },
    comments: {
        type: [Comment.schema],
        default: []
    }
}, {
    timestamps: true,
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;