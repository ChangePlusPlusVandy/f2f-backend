const mongoose = require('mongoose');

const postSchema= mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
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
        type: Array,
        default: []
    },
    likeCount: {
        type: Number,
        default: 0
    },
    comments: {
        type: Array, 
        default: []
    }
}, {
    timestamps: true,
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;