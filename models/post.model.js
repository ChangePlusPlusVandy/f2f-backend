const mongoose = require('mongoose');



const replySchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    replyBody: {
        type: String,
        trim: true,
    },
    upvotedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now()
    },
});

const commentSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        trim: true
    },
    replies: [replySchema],
    upvotedBy: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      ]
    }, {
        timestamps: true,
    });


const postSchema= mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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
    upvotedBy: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
    voteCount: {
        type: Number, 
        default: 0
    },
    comments: [commentSchema],
    commentCount: {
        type: Number, 
        default: 0
    },
}, {
    timestamps: true,
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;