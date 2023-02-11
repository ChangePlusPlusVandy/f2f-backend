const User = require('../models/user.model.js');
const Post = require('../models/post.model.js');
const Comment = require('../models/comment.model.js');
const ObjectId = require('mongodb').ObjectId;

//get all posts:
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find({});
        return res.status(200).json(posts);
    } 
    catch(err){
        console.log(err.message);
        return res.status(500).send({message: err.message});
    }
}


//gets post by id:
const getPostById = async (req, res) => {
    try{
        const postId = req.query.postId;
        if (postId){
            const post= await Post.findById(postId);
            return res.status(200).json(post);
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

//add a new child:
const addPost = async (req, res) => {
    try{
        const newPost = await Post.create(req.body);
        await newPost.save();
        return res.status(200).json(newPost);
    }
    catch(err){
        console.log(err.message);
        return res.status(500).send({message: err.message});
    }
}


//delete a child:
const deletePost = async (req, res) => {
    try{
        const postId = req.query.postId;
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

//update a Child:
const updatePost = async (req, res) => {
    try{
        const postId = req.body.postId;
        if (postId){
            const post= await post.updateOne({postId}, req.body)
            return res.status(200).json(post);
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

//add a comment:
const addComment= async (req, res) => {
    try{
        const {commentId} = req.body;
        const {postId} = req.body;
        if (commentId && postId){
            const post = await Post.findById(postId);
            const comment= await Comment.findById(commentId);
            let updatedComments = [];
            updatedComments = post.comments;
            updatedComments.push(ObjectId(commentId));
            const updatedPost= await Post.updateOne(
                {_id: postId},
                {$set: {
                    comments: updatedComments
                }}
            );
            return res.status(200).json(updatedPost);
        }
        else{
            return res.status(400).json({message: "Missing commentId or postId"});
        }

    }
    catch(err){
        console.log(err.message);
        return res.status(500).send({message: err.message});
    }
}

//deletes a comment from comment array 
const deleteComment = async (req, res) => {
    try{
        const postId = req.body.postId;
        const commentId = req.body.commentId;
        if (postId && commentId){
            const post = await Post.findById(postId);
            const comment = await Comment.findById(ObjectId(commentId));
            if (post && comment){
                let newComments = [];
                newComments = post.comments;
                //console.log(newChildren);
                newComments = newComments.filter(t=> !(t.equals(ObjectId(taskId))));
                //console.log(newChildren);
                const updatedPost = await Post.updateOne(
                    {_id: postId},
                    {$set: {
                        comments: newComments
                    }}
                );
                return res.status(200).json(updatedPost);
            }
            else{
                return res.status(400).json({message: "Could not find post or comment"});
            }
        }
        else{
            return res.status(400).json({message: "Missing postId or commentId"});
        }
    }
    catch(err){
        console.log(err.message);
        return res.status(400).send({message: err.message});
    }
}




module.exports = {getPosts, getPostById, addPost, deletePost, updatePost, addComment, deleteComment};
