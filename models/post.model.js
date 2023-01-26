const mongoose = require('mongoose'),
Schema=mongoose.Schema;
//const mongoose = require("mongoose");
//const Comment = require('../models/comment.model.js');


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
        type: [commentSchema]
    }
    /*
    comments: [{
            type: mongoose.Types.ObjectId,
            ref: 'Comment',
    }]
    */
}, {
    timestamps: true,
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;