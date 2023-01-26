const Post = require('../models/post.model.js');
const User = require('../models/user.model.js');
const Comment = require('../models/comment.model.js');
const ObjectId = require('mongodb').ObjectId;


//get all posts
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({});
        return res.status(200).json(posts);
    } 
    catch(err){
        console.log(err.message);
        return res.status(400).send({message: err.message});
    }
}


//get post by userId:
const getPostByUserId = async (req, res) => {
    try{
        console.log(req.query.userId);
        const userId = req.query.userId;
        if (userId){
            const post = await Post.find({"userId": userId})
            return res.status(200).json(post);
        }
        else{
            return res.status(400).json({message: "Missing taskId"});
        }
    }
    catch(err){
        console.log(err.message);
        return res.status(500).send({message: err.message});
    }
}

//create a news post:
const createPost = async (req, res) => {
    try{
        const {userId, firstName, lastName, disabilityTags, heading, description, votes, comments} = req.body;
        if (userId){
            const user = await User.find(ObjectId(userId));
            if (!user){
                res.status(400).json({message: "User not found"});
            }
            const newPost = await Post.create(req.body);
            await newPost.save();
            return res.status(200).json(newPost);
        }
        else{
            return res.status(400).json({message: "Invalid userId query"});
        }    
    }
    catch(err){
        console.log(err.message);
        return res.status(400).send({message: err.message});
    }
}

//update a post:
const updatePost = async (req, res) => {
    try{
        const {postId} = req.body;
        if (postId){
            const post = await Post.updateOne({postId}, req.body)
            return res.status(200).json(post);
        }
        else{
            return res.status(500).send("Invalid postID query");
        }
    }
    catch(err){
        console.log(err.message);
        return res.status(500).send({message: err.message});
    }
}

/*
//comment on a post:
const commentPost = async (req, res) => {
    try{
        console.log("here");
        const {postId} = req.body;
        if (postId){
            const post = await Post.find(ObjectId(postId));
            const comment = await Comment.create(req.body);
            await comment.save();
            if (!post.comments){
                let commentArray = [];
                commentArray.push(comment);
                const updatedPost = await Post.updateOne({postId}, commentArray);
                await updatedPost.save();
            }
            else{
                post.comments.push(comment);
                const updatedPost = await Post.updateOne({postId}, post.comments);
                await updatedPost.save();
            }
            return res.status(200).json(post);
        }
        else{
            return res.status(400).send("Invalid postID query");
        }
    }
    catch(err){
        console.log(err.message);
        return res.status(500).json({message: err.message});    
    }
}

const upVoteComment = async (req, res) => {
    const commentId = req.params.commentId;
    try{
        const comment = await Comment.findById(commentId);
        comment.votes = comment.votes + 1;
        await comment.save();
        return res.status(200).json(comment);
    }
    catch(err){
        return res.status(400).json({message: err.message});    
    }
}


//delete a comment or reply:
const deleteComment = async (req, res) => {
    const commentId = req.params.commentId;
    const postId = req.body.postId;
    try{
        const post = await Post.findById(postId);
        const allComments = post.comments.filter(comment => comment.commentId != commentId);
        post.comments = allComments;
        if (commentId){
            Comment.deleteOne({_id: commentId}).then(() => 
                    res.status(200).json({ message: "Comment successfully deleted." })
                );
        }
        else{
            return res.status(500).send("Invalid postID query");
        }
        return res.status(200).json(post);
    }
    catch(err){
        return res.status(400).send({message: err.message});
    }
}
*/



//delete a post:
const deletePost = async (req, res) => {
    try{
        const {postId} = req.body;
        if (postId){
            const post = await Post.deleteOne({_id: postId})
            .then(() => res.status(200).json({message: "Post deleted successfully"}))
            .catch((error) => res.status(400).json({message: error}));
        }
        else{
            return res.status(400).json({message: "Missing postId"});
        }
    }
    catch(err){
        console.log(err.message);
        return res.status(500).send({message: err.message});
    }
}


module.exports = {getAllPosts, getPostByUserId, createPost, updatePost, deletePost};
