const Post = require('../models/post.model.js');
const Comment = require('../models/comment.model.js');
const User = require('../models/user.model.js');
const ObjectId = require('mongodb').ObjectId;


const getComments = async (req, res) => {
    try {
        const comments = await Comment.find({});
        return res.status(200).json(comments);
    } 
    catch(err){
        console.log(err.message);
        return res.status(500).send({message: err.message});
    }
}

const getCommentById = async (req, res) => {
    try {
        let commentId = req.params.commentId;
        const comment = await Comment.findById(commentId);
        return res.status(200).json(comment);
    } 
    catch(err){
        console.log(err.message);
        return res.status(500).send({message: err.message});
    }
}

const getAllCommentsForPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);
        const commentArray = post.comments;
        let commentObjects = [];
        for(let i = 0; i < commentArray.length; i++){
            let commentId = commentArray[i];
            try{
                const curComment = await Comment.find({_id: commentId});
                if (curComment[0] != null)
                {
                    commentObjects.push(curComment[0]);
                }
            }
            catch(err){
                console.log(err.message);
                return res.status(500).send({message: err.message});
            }
        }
        return res.status(200).json(commentObjects);
    } 
    catch(err){
        console.log(err.message);
        return res.status(500).send({message: err.message});
    }
}


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
        const postId = req.params.id;
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

const getPostByDisabilities = async (req, res) => {
    try{
        const disabilities = JSON.parse(req.query.disabilities);
        if (disabilities.length === 0){
            const allPosts = await Post.find({});
            return res.status(200).json(allPosts);
        }
        else{
            const posts = await Post.find({
                disabilityTags: {$in: disabilities}
            });
            return res.status(200).json(posts);
        }
    } 
    catch(err){
        console.log(err.message);
        return res.status(500).send({message: err.message});
    }
}

//add a new post:
const addPost = async (req, res) => {
    try{
        const newPost = await Post.create(req.body);
        const user = await User.findById(req.body.userId);
        const updatedUser = await user.updateOne({
            $push: {posts: newPost._id}
        });
        console.log(updatedUser);
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
        const postId = req.params.id;
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

//update a Post:
const updatePost = async (req, res) => {
    try{
        const postId = req.params.id;
        if (postId){
            const post= await Post.updateOne({postId}, req.body)
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


const addComment= async (req, res) => {
    try{
        const postId = req.params.id;
        const comment = await Comment.create({
            userId: ObjectId(req.body.userId),
            postId: ObjectId(req.params.id),
            upVotes: req.body.upVotes,
        });
        const post = await Post.findById(postId);
        const updatedPost = await post.updateOne({
            $push: {comments: comment}
        });
        return res.status(200).json(updatedPost);
    }
    catch(err){
        console.log(err.message);
        return res.status(500).send({message: err.message});
    }
}

//deletes a comment from comment array 
const deleteComment = async (req, res) => {
    try{
        const postId = req.params.id;
        const commentId = req.params.commentId;
        if (postId && commentId){
            const post = await Post.findById(postId);
            const updatedPost = await post.updateOne({
                $pull: {comments: commentId}
            });
            const deletedComment = await Comment.deleteOne({_id: commentId});
            return res.status(200).send(updatedPost);
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

const updateComment= async (req, res) => {
    try{
        const commentId = req.params.commentId;
        if (commentId){
            const comment= await Comment.updateOne({_id: commentId}, req.body)
            return res.status(200).json(comment);
        }
        else{
            return res.status(400).json({message: "Missing commentId"});
        }
    }
    catch(err){
        console.log(err.message);
        return res.status(500).send({message: err.message});
    }
}




module.exports = {getComments, getAllCommentsForPost, getCommentById, getPosts, getPostById, getPostByDisabilities, addPost, deletePost, updatePost, addComment, deleteComment, updateComment};
