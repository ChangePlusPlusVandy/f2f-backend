const Post = require('../models/post.model.js');
const User = require('../models/user.model.js');
const Comment = require('../models/post.model.js');
const Reply = require('../models/post.model.js');
const ObjectId = require('mongodb').ObjectId;

//create a news post:
//put postID in the params
const createComment = async (req, res) => {
    try{
        const postId = req.query.postId;
        const post = await Post.find(ObjectId(postId));
        const {userId, content, replies} = req.body;
        const user = await User.find(ObjectId(userId));
        if (!user){
            res.status(400).json({message: "User not found"});
        }
        if (!post){
            res.status(400).json({message: "Post not found"});
        }
        const newComment = await Comment.create(userId, content, replies);
        post.comments = post.comments.concat(newComment);
        const savedPost = await post.save();
        const populatedPost = await savedPost
            .populate('comments.commentedBy', 'userId')
            .execPopulate();
        await user.save();
        return replies.status(200).json(savedPost);
    }
    catch(err){
        console.log(err.message);
        return res.status(500).send({message: err.message});
    }
}

const deleteComment = async (req, res) => {
    try{
        const commentId = req.body.commentId;
        const postId = req.body.postId;
        const userId = req.body.userId;
        const post = await Post.find(ObjectId(postId));
        const user= await User.find(ObjectId(userId));
        if (!user){
            res.status(400).json({message: "User not found"});
        }
        if (!post){
            res.status(400).json({message: "Post not found"});
        }
        const allComments = post.comments.filter(comment => comment.commentId != commentId);
        post.comments = allComments;
        await post.save();
        return res.status(200).json(post);
    }
    catch(err){
        console.log(err.message);
        return res.status(500).send({message: err.message});
    }
}


const createReply = async (req, res) => {
    try{
        const postId = req.body.postId;
        const commentId = req.body.commentId;
        const {userId, replyBody} = req.body;
        const post = await Post.find(ObjectId(postId));
        const user = await User.find(ObjectId(userId));
        if (!user){
            res.status(400).json({message: "User not found"});
        }
        if (!post){
            res.status(400).json({message: "Post not found"});
        }
        const targetComment = post.comments.find(
            (c) => c._id.toString() === commentId
        );
        if (!targetComment){
            res.status(400).json({message: "Comment not found"});
        }
        targetComment.replies = targetComment.replies.concat({
            userId: userId,
            replyBody: replyBody,
        });
        post.comments = post.comments.map((c) =>
        c._id.toString() !== commentId ? c : targetComment
       );
        const savedPost = await post.save();
        const populatedPost = await savedPost
            .populate('comments.replies.repliedBy', 'userId')
            .execPopulate();
        const commentToReply = populatedPost.comments.find(
            (c) => c._id.toString() === commentId
        );
        const addedReply = commentToReply.replies[commentToReply.replies.length - 1];
        return replies.status(200).json(addedReply);
    }
    catch(err){
        console.log(err.message);
        return res.status(500).send({message: err.message});
    }
}



module.exports = {createComment, deleteComment, createReply};



