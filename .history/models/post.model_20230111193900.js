const mongoose = require('mongoose');

const postSchema= mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
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
    image: {
        type: String,
    },
    likes:{
        type: [String],
        default: []
    },
    likeCount: {
        type: Number,
        default: 0
    },
    replies: {
        type: [String], 
        default: []
    }
}, {
    timestamps: true,
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;